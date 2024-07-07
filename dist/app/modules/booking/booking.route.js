"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const zodValidation_1 = __importDefault(require("../../middlewares/zodValidation"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.bookingController.getAllBookingsFromDb);
router.post('/', (0, auth_1.default)('user'), (0, zodValidation_1.default)(booking_validation_1.BookingValidation.createCarBookingValidationSchema), booking_controller_1.bookingController.createBooking);
router.get('/my-bookings', (0, auth_1.default)('user'), booking_controller_1.bookingController.getUserSpecificBookings);
exports.BookingRoutes = router;
