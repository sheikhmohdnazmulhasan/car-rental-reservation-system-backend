import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../booking/booking.model";
import Car from "../car/car.model";
import { TBooking } from "../booking/booking.interface";

async function statistics(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    const result: Record<string, unknown> = {};

    try {
        // Total Bookings
        result.total_booking = await Booking.countDocuments();
        // total vehicles
        result.total_vehicles = await Car.countDocuments({ isDeleted: false });

        // total revenue
        result.total_revenue = (await Booking.find())
            .filter(booking => booking.totalCost > 0) // Filter out negative values
            .reduce((acc, booking) => booking.totalCost + acc, 0);

        if (!result.total_booking || !result.total_vehicles || !result.total_revenue) {
            res.status(400).json({
                success: false,
                message: 'admin statistics fetched Unsuccessful',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'admin statistics fetched successfully',
            data: result
        });

    } catch (error) {
        next(error);
    }
    console.log(result);
}

export const adminStatistics = { statistics }