import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";
import httpStatus from "http-status";

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
    }

}; //end

async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.updateBookingStatusIntoDb(
            req.params.bookingId as string,
            req.query.action as "ongoing" | "canceled",
            next);

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });
        };

    } catch (error) {
        next(error)
    }

}

async function getUserSpecificBookings(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.getUserSpecificBookingsFromDb(req.user, next);

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

async function getAllBookingsFromDb(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await BookingServices.getAllBookingsFromDb(req.query, next);

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });
        };

    } catch (error) {
    }
}

async function deleteCanceledBooking(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await BookingServices.deleteCanceledBookingFormDb(req.query._id as string, next);
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
    }
}

// exports
export const bookingController = {
    createBooking,
    getUserSpecificBookings,
    getAllBookingsFromDb,
    updateBookingStatus,
    deleteCanceledBooking
};