import { Router } from "express";
import { bookingController } from "./booking.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { BookingValidation } from "./booking.validation";

const router = Router();

router.get('/', Auth('admin'), bookingController.getAllBookingsFromDb)
router.post('/', Auth('user'), bookingController.createBooking);

router.get('/my-bookings', Auth('user'), bookingController.getUserSpecificBookings);

export const BookingRoutes = router;

// ValidationRequest(BookingValidation.createCarBookingValidationSchema),