import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";

async function createBooking(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.createBookingIntoDb(req.user, req.body, next);

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });

        };

    } catch (error) {
        next(error);
    };

}; //end

export const bookingController = { createBooking };