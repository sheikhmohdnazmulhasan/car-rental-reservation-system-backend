import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { NextFunction } from "express";
import User from "../user/user.model";
import Car from "../car/car.model";
import httpStatus from "http-status";
import Booking from "./booking.model";

async function createBookingIntoDb(user: JwtPayload, payload: any, next: NextFunction) {

    try {

        const isCarIdCorrect = await Car.findById(payload.carId);
        if (!isCarIdCorrect) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Invalid Car ID', data: [] }
        }

        const userObj = await User.findOne({ email: user.user });
        if (!userObj) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Booking Unsuccessful', data: [] }
        };

        const updateCarStatus = await Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' });
        if (!updateCarStatus) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Booking Unsuccessful', data: [] }
        };

        const dataForServer = { car: isCarIdCorrect._id, date: payload.date, startTime: payload.startTime, user: userObj?._id };

        const booking = (await Booking.create(dataForServer)).populate('car');

        if (!booking) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Booking Unsuccessful', data: [] };
        };

        // const bookingForClient = await Booking.findById(booking)


        return { success: true, statusCode: httpStatus.OK, message: 'Car booked successfully', data: booking }

    } catch (error) {
        next(error)
    }

};

export const BookingServices = { createBookingIntoDb };