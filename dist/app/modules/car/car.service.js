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
exports.CarServices = void 0;
const car_model_1 = __importDefault(require("./car.model"));
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
function createCarIntoDb(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCar = yield car_model_1.default.create(payload);
            if (newCar) {
                return {
                    success: true,
                    statusCode: http_status_1.default.CREATED,
                    message: 'Car created successfully',
                    data: newCar
                };
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function getAllCarsFromDb(query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let searchTerm = null;
        let location = null;
        let color = null;
        let minPrice = null;
        let maxPrice = null;
        let sortOrder = 'asc';
        if (query === null || query === void 0 ? void 0 : query.searchTerm)
            searchTerm = query.searchTerm;
        if (query === null || query === void 0 ? void 0 : query.location)
            location = query.location;
        if (query === null || query === void 0 ? void 0 : query.color)
            color = query.color;
        if (query === null || query === void 0 ? void 0 : query.minPrice)
            minPrice = Number(query.minPrice);
        if (query === null || query === void 0 ? void 0 : query.maxPrice)
            maxPrice = Number(query.maxPrice);
        if (query === null || query === void 0 ? void 0 : query.sortOrder)
            sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';
        let filter = {};
        filter.isDeleted = false;
        if (searchTerm) {
            filter.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { location: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        if (location) {
            filter.location = location.charAt(0).toUpperCase() + location.slice(1);
        }
        if (color) {
            filter.color = color.charAt(0).toUpperCase() + color.slice(1);
        }
        if (minPrice !== null && maxPrice !== null) {
            filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };
        }
        else if (minPrice !== null) {
            filter.pricePerHour = { $gte: minPrice };
        }
        else if (maxPrice !== null) {
            filter.pricePerHour = { $lte: maxPrice };
        }
        try {
            const result = yield car_model_1.default.find(filter).sort({ pricePerHour: sortOrder });
            if (result) {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Cars retrieved successfully',
                    data: result
                };
            }
            else {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'No Data Found',
                    data: []
                };
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function getSpecificCarFromDb(query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const car = yield car_model_1.default.findOne({ _id: query, isDeleted: false });
            if (car) {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'A Car retrieved successfully',
                    data: car
                };
            }
            else {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'No Data Found',
                    data: []
                };
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
} //end;
function updateSpecificCarIntoDb(query, payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedData = yield car_model_1.default.findByIdAndUpdate(query, payload, { new: true });
            if (updatedData) {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Car updated successfully',
                    data: updatedData
                };
            }
            else {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'No Data Found',
                    data: []
                };
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function deleteACarFromDb(query, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataAfterDelete = yield car_model_1.default.findByIdAndUpdate(query, { isDeleted: true }, { new: true });
            if (dataAfterDelete) {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Car Deleted successfully',
                    data: dataAfterDelete
                };
            }
            else {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'Invalid ID',
                    data: []
                };
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function returnCarDb(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (timeRegex.test(payload.endTime)) {
            session.startTransaction();
            try {
                const bookingObj = yield booking_model_1.default.findById(payload === null || payload === void 0 ? void 0 : payload.bookingId).populate('car').session(session);
                if (!bookingObj) {
                    return {
                        success: false,
                        statusCode: 400,
                        message: 'Invalid booking id',
                        data: []
                    };
                }
                ;
                if (bookingObj.endTime) {
                    return {
                        success: false,
                        statusCode: 400,
                        message: 'This booking is already closed',
                        data: []
                    };
                }
                ;
                const startMoment = (0, moment_1.default)(bookingObj.startTime, 'HH:mm');
                const endMoment = (0, moment_1.default)(payload.endTime, 'HH:mm');
                const duration = moment_1.default.duration(endMoment.diff(startMoment)).asHours();
                const totalCost = duration * (bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.car).pricePerHour;
                const updateCarStatus = yield car_model_1.default.findByIdAndUpdate((bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.car)._id, { status: 'available' }).session(session);
                if (!updateCarStatus) {
                    return {
                        success: false,
                        statusCode: 400,
                        message: 'Operation Unsuccessful',
                        data: []
                    };
                }
                ;
                const updateDataObj = {
                    endTime: payload.endTime,
                    totalCost: totalCost.toFixed(2),
                    status: 'succeed'
                };
                const updateBooking = yield booking_model_1.default.findByIdAndUpdate(payload.bookingId, updateDataObj, { new: true }).populate('car user').session(session);
                if (!updateBooking) {
                    return {
                        success: false,
                        statusCode: 400,
                        message: 'Operation Unsuccessful',
                        data: []
                    };
                }
                yield session.commitTransaction();
                yield session.endSession();
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Car returned successfully',
                    data: updateBooking
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
            if (/^\d{4}$/.test(payload.endTime)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Time should be in HH:MM format, not without colon.',
                    data: []
                };
            }
            else if (/^\d{2}$/.test(payload.endTime)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Time should be in HH:MM format, you only provided hours.',
                    data: []
                };
            }
            else {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Invalid time format.',
                    data: []
                };
            }
        }
    });
}
; // end
exports.CarServices = {
    createCarIntoDb,
    getAllCarsFromDb,
    getSpecificCarFromDb,
    updateSpecificCarIntoDb,
    deleteACarFromDb,
    returnCarDb
};
