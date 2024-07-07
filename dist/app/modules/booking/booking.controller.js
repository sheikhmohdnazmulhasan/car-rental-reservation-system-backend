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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
function createBooking(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield booking_service_1.BookingServices.createBookingIntoDb(req.user, req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end
function getUserSpecificBookings(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield booking_service_1.BookingServices.getUserSpecificBookingsFromDb(req.user, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end
function getAllBookingsFromDb(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield booking_service_1.BookingServices.getAllBookingsFromDb(req.query, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
        }
    });
}
exports.bookingController = { createBooking, getUserSpecificBookings, getAllBookingsFromDb };
