import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";

async function createBooking(req: Request, res: Response, next: NextFunction) {

    try {
        const result = BookingServices.createBookingIntoDb(req.user, req.body, next);

    } catch (error) {
        next(error);
    };

}; //end

export const bookingController = { createBooking };