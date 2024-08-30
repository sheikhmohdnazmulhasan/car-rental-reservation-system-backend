import { Router } from "express";
import { bookingController } from "./booking.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { BookingValidation } from "./booking.validation";

const router = Router();

router.get('/', Auth('admin'), bookingController.getAllBookingsFromDb)
router.post('/', Auth('user'), ValidationRequest(BookingValidation.createCarBookingValidationSchema), bookingController.createBooking);

router.patch('/action/status/:bookingId', Auth('admin'), bookingController.updateBookingStatus)
router.get('/my-bookings', Auth('user'), bookingController.getUserSpecificBookings);
router.delete('/delete', Auth('admin'), bookingController.deleteCanceledBooking)

export const BookingRoutes = router;

// 