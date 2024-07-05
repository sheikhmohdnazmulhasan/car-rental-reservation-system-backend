import { Router } from "express";
import { bookingController } from "./booking.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { BookingValidation } from "./booking.validation";

const router = Router();

router.post('/', Auth('user'), ValidationRequest(BookingValidation.createCarBookingValidationSchema), bookingController.createBooking);

export const BookingRoutes = router;