import { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import User from "../user/user.model";
import Car from "../car/car.model";
import httpStatus from "http-status";
import Booking from "./booking.model";
import mongoose from "mongoose";
import isValidDate from "../../middlewares/checkValidDate";

async function createBookingIntoDb(user: JwtPayload, payload: any, next: NextFunction) {
    const session = await mongoose.startSession();
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (isValidDate(payload.date)) {
        if (timeRegex.test(payload.startTime)) {

            try {

                // start session
                session.startTransaction();

                const fullCarObj = await Car.findById(payload.carId).session(session);

                if (!fullCarObj || fullCarObj.isDeleted) {
                    return {
                        success: false,
                        statusCode: httpStatus.BAD_REQUEST,
                        message: 'The car ID you provided is incorrect or the car is past way',
                        data: []
                    };
                }

                if (fullCarObj.status === 'unavailable') {
                    return {
                        success: false,
                        statusCode: httpStatus.BAD_REQUEST,
                        message: 'Car is not available right now!',
                        data: []
                    };

                };

                const userObj = await User.findOne({ email: user.user }).session(session);
                if (!userObj) {
                    return {
                        success: false,
                        statusCode: httpStatus.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    }
                };

                const updateCarStatus = await Car.findByIdAndUpdate(payload.carId, { status: 'unavailable' }).session(session);
                if (!updateCarStatus) {
                    return {
                        success: false,
                        statusCode: httpStatus.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    }
                };

                const dataForServer = {
                    car: fullCarObj._id,
                    date: payload.date,
                    startTime: payload.startTime,
                    additionalInfo: payload.additionalInfo,
                    user: userObj?._id
                };

                const booking = await Booking.create([dataForServer], { session });
                ;
                const populatedBooking = await booking[0].populate('car user');

                if (!booking) {
                    return {
                        success: false,
                        statusCode: httpStatus.BAD_REQUEST,
                        message: 'Booking Unsuccessful',
                        data: []
                    };
                };

                await session.commitTransaction();
                await session.endSession();

                return {
                    success: true,
                    statusCode: httpStatus.OK,
                    message: 'Car booked successfully',
                    data: populatedBooking
                }

            } catch (error) {
                await session.abortTransaction();
                await session.endSession();
                next(error)
            };

        } else {

            if (/^\d{4}$/.test(payload.startTime)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Time should be in HH:MM format, not without colon.',
                    data: []
                }

            } else if (/^\d{2}$/.test(payload.startTime)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Time should be in HH:MM format, you only provided hours.',
                    data: []
                }

            } else {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Invalid time format.',
                    data: []
                }
            };
        };

    } else {
        return {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Invalid Date.',
            data: []
        }
    }

}; //end

async function getUserSpecificBookingsFromDb(user: JwtPayload, next: NextFunction) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const userObj = await User.findOne({ email: user?.user }).session(session);

        if (!userObj) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Failed to fetch booking',
                data: []
            };
        };

        const bookings = await Booking.find({ user: userObj._id }).session(session).populate('car user');

        if (!bookings.length) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Failed to fetch booking',
                data: []
            };

        };

        await session.commitTransaction();
        await session.endSession();

        return {
            success: true,
            statusCode: httpStatus.OK,
            message: 'My Bookings retrieved successfully',
            data: bookings
        };


    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        next(error);
    };

}; //end

async function getAllBookingsFromDb(query: any, next: NextFunction) {
    let bookings;

    try {
        if (query.carId && !query.date) {
            bookings = await Booking.find({ car: query?.carId }).populate('car user');

        } else if (query.date && !query.carId) {

            if (isValidDate(query.date)) {
                bookings = await Booking.find({ date: query?.date }).populate('car user');

            } else {
                return {
                    success: false,
                    statusCode: httpStatus.BAD_REQUEST,
                    message: 'Date Not Valid',
                    data: []
                };

            };

        } else if (query.date && query.carId) {

            if (isValidDate(query.date)) {
                bookings = await Booking.find({ car: query?.carId, date: query?.date }).populate('car user');

            } else {
                return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Date Not Valid', data: [] };
            };

        } else {
            bookings = await Booking.find().populate('car user');
        };

        if (!bookings.length) {
            return { success: false, statusCode: httpStatus.NOT_FOUND, message: 'Not Found', data: [] };

        }

        return { success: true, statusCode: httpStatus.OK, message: 'Bookings retrieved successfully', data: bookings };

    } catch (error) {
        next(error);
    };
}

export const BookingServices = { createBookingIntoDb, getUserSpecificBookingsFromDb, getAllBookingsFromDb };