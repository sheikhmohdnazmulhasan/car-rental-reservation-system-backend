import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

async function statistics(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    const result: Record<string, unknown> = {};

    try {
        // Total Bookings
        const total_booking = 
    } catch (error) {
        next(error);
    }

}

export const adminStatistics = { statistics }