"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const car_model_1 = __importDefault(require("../car/car.model"));
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = __importDefault(require("./booking.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkValidDate_1 = __importDefault(require("../../middlewares/checkValidDate"));
function createBookingIntoDb(user, payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        // const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if ((0, checkValidDate_1.default)(payload.date)) {
            try {
                // start session
                session.startTransaction();
                const fullCarObj = yield car_model_1.default.findById(payload.carId).session(session);
                if (!fullCarObj || fullCarObj.isDeleted) {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'The car ID you provided is incorrect or the car is past way',
                        data: []
                    };
                }
                if (fullCarObj.status === 'unavailable') {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Car is not available right now!',
                        data: []
                    };
                }
                ;
                const userObj = yield user_model_1.default.findOne({ email: user.user }).session(session);
                if (!userObj) {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    };
                }
                ;
                const updateCarStatus = yield car_model_1.default.findByIdAndUpdate(payload.carId, { status: 'unavailable' }).session(session);
                if (!updateCarStatus) {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    };
                }
                ;
                const dataForServer = {
                    car: fullCarObj._id,
                    date: payload.date,
                    startTime: payload.startTime,
                    additionalInfo: payload.additionalInfo,
                    user: userObj === null || userObj === void 0 ? void 0 : userObj._id
                };
                const booking = yield booking_model_1.default.create([dataForServer], { session });
                ;
                const populatedBooking = yield booking[0].populate('car user');
                if (!booking) {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    };
                }
                ;
                yield session.commitTransaction();
                yield session.endSession();
                return {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'Car booked successfully',
                    data: populatedBooking
                };
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                next(error);
            }
            ;
        }
        else {
            return {
                success: false,
                statusCode: http_status_1.default.BAD_REQUEST,
                message: 'Invalid Date.',
                data: []
            };
        }
    });
}
; //end
function updateBookingStatusIntoDb(_id, action, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        const date = new Date().toLocaleDateString();
        const hours = new Date().getHours().toString().padStart(2, '0');
        const minutes = new Date().getMinutes().toString().padStart(2, '0');
        const startTime = `${hours}:${minutes}`;
        try {
            switch (action) {
                case 'ongoing':
                    const data = { date, startTime, status: 'ongoing' };
                    const result = yield booking_model_1.default.findByIdAndUpdate(_id, data, { new: true });
                    if (result)
                        return {
                            success: true,
                            statusCode: http_status_1.default.OK,
                            message: 'Status Changed Successfully',
                            data: result
                        };
                    break;
                case 'canceled':
                    session.startTransaction();
                    const bookingObj = yield booking_model_1.default.findById(_id).session(session);
                    if (!bookingObj) {
                        return {
                            success: false,
                            statusCode: 400,
                            message: 'Invalid booking id',
                            data: []
                        };
                    }
                    ;
                    const updateCarStatus = yield car_model_1.default.findByIdAndUpdate((bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.car)._id, { status: 'available' }, { new: true }).session(session);
                    if (!updateCarStatus) {
                        return {
                            success: false,
                            statusCode: 400,
                            message: 'Operation Unsuccessful',
                            data: []
                        };
                    }
                    ;
                    const _result = yield booking_model_1.default.findByIdAndUpdate(_id, { status: 'canceled' }, { new: true }).session(session);
                    if (!_result)
                        return {
                            success: true,
                            statusCode: http_status_1.default.BAD_REQUEST,
                            message: 'Operation Unsuccessful',
                            data: _result
                        };
                    yield session.commitTransaction();
                    yield session.endSession();
                    return {
                        success: true,
                        statusCode: http_status_1.default.OK,
                        message: 'Status Changed Successfully',
                        data: _result
                    };
                default:
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Invalid Query params',
                        data: []
                    };
            }
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            next(error);
        }
    });
}
function getUserSpecificBookingsFromDb(user, query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        const _query = {};
        try {
            session.startTransaction();
            const userObj = yield user_model_1.default.findOne({ email: user === null || user === void 0 ? void 0 : user.user }).session(session);
            if (!userObj) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Failed to fetch booking',
                    data: []
                };
            }
            ;
            _query.user = userObj._id;
            if (query.status) {
                _query.status = query.status;
            }
            ;
            if (query._id) {
                _query._id = query._id;
            }
            const bookings = yield booking_model_1.default.find(_query).session(session).populate('car user');
            // if (!bookings.length) {
            //     return {
            //         success: false,
            //         statusCode: httpStatus.BAD_REQUEST,
            //         message: 'Failed to fetch booking',
            //         data: []
            //     };
            // };
            yield session.commitTransaction();
            yield session.endSession();
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'My Bookings retrieved successfully',
                data: bookings
            };
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            next(error);
        }
        ;
    });
}
; //end
function afterPaymentPatchIntoDb(user, payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        if (!payload.transactionId) {
            return {
                success: false,
                statusCode: http_status_1.default.BAD_REQUEST,
                message: 'Failed to verifying transaction id',
                data: []
            };
        }
        try {
            session.startTransaction();
            const bookingObj = yield booking_model_1.default.findById(payload === null || payload === void 0 ? void 0 : payload.bookingId).populate('user').session(session);
            if (!bookingObj) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'error fetching booking',
                    data: []
                };
            }
            ;
            if (bookingObj.user.email !== user.user) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Failed to verifying won booking',
                    data: []
                };
            }
            ;
            const patchBooking = yield booking_model_1.default.findByIdAndUpdate(payload.bookingId, { paymentStatus: 'verified' }, { new: true }).session(session);
            if (!patchBooking) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: "Failed to update booking's payment status",
                    data: []
                };
            }
            ;
            yield session.commitTransaction();
            yield session.endSession();
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: "Operation successful",
                data: patchBooking
            };
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            next(error);
        }
    });
}
function getAllBookingsFromDb(query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookings;
        try {
            if (query.status) {
                bookings = yield booking_model_1.default.find({ status: query.status }).populate('car user');
                if (!bookings.length) {
                    return {
                        success: false,
                        statusCode: http_status_1.default.OK,
                        message: 'Data not found',
                        data: []
                    };
                }
                else {
                    return {
                        success: true,
                        statusCode: http_status_1.default.OK,
                        message: 'Bookings retrieved successfully',
                        data: bookings
                    };
                }
            }
            if (query.carId && !query.date) {
                bookings = yield booking_model_1.default.find({ car: query === null || query === void 0 ? void 0 : query.carId }).populate('car user');
            }
            else if (query.date && !query.carId) {
                if ((0, checkValidDate_1.default)(query.date)) {
                    bookings = yield booking_model_1.default.find({ date: query === null || query === void 0 ? void 0 : query.date }).populate('car user');
                }
                else {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Date Not Valid',
                        data: []
                    };
                }
                ;
            }
            else if (query.date && query.carId) {
                if ((0, checkValidDate_1.default)(query.date)) {
                    bookings = yield booking_model_1.default.find({ car: query === null || query === void 0 ? void 0 : query.carId, date: query === null || query === void 0 ? void 0 : query.date }).populate('car user');
                }
                else {
                    return {
                        success: false,
                        statusCode: http_status_1.default.BAD_REQUEST,
                        message: 'Date Not Valid',
                        data: []
                    };
                }
                ;
            }
            else {
                bookings = yield booking_model_1.default.find().populate('car user');
            }
            ;
            if (!bookings.length) {
                return {
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'Not Found',
                    data: []
                };
            }
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Bookings retrieved successfully',
                data: bookings
            };
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
function deleteCanceledBookingFormDb(_id, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const fullBookingObj = yield booking_model_1.default.findById(_id).session(session);
            if (!fullBookingObj) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Invalid Booking Id',
                    data: []
                };
            }
            else if ((fullBookingObj === null || fullBookingObj === void 0 ? void 0 : fullBookingObj.status) !== 'canceled') {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'You Cannot delete pending or ongoing booking. Only canceled booking are allowed',
                    data: []
                };
            }
            const deleteOrder = yield booking_model_1.default.findByIdAndDelete(_id).session(session);
            if (!deleteOrder) {
                return {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: 'Operation Unsuccessful',
                    data: []
                };
            }
            yield session.commitTransaction();
            yield session.endSession();
            return {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Booking Deleted',
                data: []
            };
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            next(error);
        }
    });
}
exports.BookingServices = {
    createBookingIntoDb,
    getUserSpecificBookingsFromDb,
    getAllBookingsFromDb,
    updateBookingStatusIntoDb,
    deleteCanceledBookingFormDb,
    afterPaymentPatchIntoDb
};
