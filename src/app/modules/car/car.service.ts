import { NextFunction } from "express";
import { TCar } from "./car.interface";
import Car from "./car.model";
import httpStatus from "http-status";
import Booking from "../booking/booking.model";
import moment from 'moment';
import mongoose from "mongoose";

async function createCarIntoDb(payload: TCar, next: NextFunction) {

    try {
        const newCar = await Car.create(payload);
        if (newCar) {
            return {
                success: true,
                statusCode: httpStatus.CREATED,
                message: 'Car created successfully',
                data: newCar
            }
        };

    } catch (error) {
        next(error);
    };

}; //end;


async function getAllCarsFromDb(query: Record<string, unknown>, next: NextFunction) {
    let searchTerm: string | null = null;
    let location: string | null = null;
    let minPrice: number | null = null;
    let maxPrice: number | null = null;
    let sortOrder: 'asc' | 'desc' = 'asc';

    if (query?.searchTerm) searchTerm = query.searchTerm as string;
    if (query?.location) location = query.location as string;
    if (query?.minPrice) minPrice = Number(query.minPrice);
    if (query?.maxPrice) maxPrice = Number(query.maxPrice);
    if (query?.sortOrder) sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

    let filter: Record<string, unknown> = {};
    filter.isDeleted = false;

    if (searchTerm) {
        filter.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    if (location) {
        filter.location = location.charAt(0).toUpperCase() + location.slice(1);
    }

    if (minPrice !== null && maxPrice !== null) {
        filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };

    } else if (minPrice !== null) {
        filter.pricePerHour = { $gte: minPrice };

    } else if (maxPrice !== null) {
        filter.pricePerHour = { $lte: maxPrice };
    }

    try {
        const result = await Car.find(filter).sort({ pricePerHour: sortOrder });
        if (result) {
            return {
                success: true,
                statusCode: 200,
                message: 'Cars retrieved successfully',
                data: result
            }

        } else {
            return {
                success: false,
                statusCode: 404,
                message: 'No Data Found',
                data: []
            }

        };

    } catch (error) {
        next(error)
    };

}; //end;

async function getSpecificCarFromDb(query: string, next: NextFunction) {

    try {
        const car = await Car.findOne({ _id: query, isDeleted: false });
        if (car) {
            return {
                success: true,
                statusCode: 200,
                message: 'A Car retrieved successfully',
                data: car
            }

        } else {
            return {
                success: false,
                statusCode: 404,
                message: 'No Data Found',
                data: []
            }
        }

    } catch (error) {
        next(error);
    };

}//end;

async function updateSpecificCarIntoDb(query: string, payload: TCar, next: NextFunction) {

    try {
        const updatedData = await Car.findByIdAndUpdate(query, payload, { new: true });
        if (updatedData) {
            return {
                success: true,
                statusCode: 200,
                message: 'Car updated successfully',
                data: updatedData
            };

        } else {
            return {
                success: false,
                statusCode: 404,
                message: 'No Data Found',
                data: []
            }
        }

    } catch (error) {
        next(error);
    };

}; //end;

async function deleteACarFromDb(query: string, next: NextFunction) {

    try {
        const dataAfterDelete = await Car.findByIdAndUpdate(query, { isDeleted: true }, { new: true });
        if (dataAfterDelete) {
            return {
                success: true,
                statusCode: 200,
                message: 'Car Deleted successfully',
                data: dataAfterDelete
            };

        } else {
            return {
                success: false,
                statusCode: 404,
                message: 'Invalid ID',
                data: []
            };
        };

    } catch (error) {
        next(error);
    };

}; //end;

async function returnCarDb(payload: any, next: NextFunction) {
    const session = await mongoose.startSession();
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (timeRegex.test(payload.endTime)) {
        session.startTransaction();

        try {
            const bookingObj = await Booking.findById(payload?.bookingId).populate('car').session(session);
            if (!bookingObj) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Invalid booking id',
                    data: []
                }
            };

            if (bookingObj.endTime) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'This booking is already closed',
                    data: []
                }
            };

            const startMoment = moment(bookingObj.startTime, 'HH:mm');
            const endMoment = moment(payload.endTime, 'HH:mm');
            const duration = moment.duration(endMoment.diff(startMoment)).asHours();
            const totalCost = duration * (bookingObj?.car as any).pricePerHour;

            const updateCarStatus = await Car.findByIdAndUpdate((bookingObj?.car as any)._id, { status: 'available' }).session(session);

            if (!updateCarStatus) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Operation Unsuccessful',
                    data: []
                }
            };

            const updateDataObj = {
                endTime: payload.endTime,
                totalCost: totalCost.toFixed(2),
                status: 'succeed'
            };

            const updateBooking = await Booking.findByIdAndUpdate(payload.bookingId, updateDataObj, { new: true }).populate('car user').session(session);

            if (!updateBooking) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Operation Unsuccessful',
                    data: []
                }
            }

            await session.commitTransaction();
            await session.endSession();

            return {
                success: true,
                statusCode: 200,
                message: 'Car returned successfully',
                data: updateBooking
            }

        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            next(error);
        };

    } else {

        if (/^\d{4}$/.test(payload.endTime)) {
            return {
                success: false,
                statusCode: 400,
                message: 'Time should be in HH:MM format, not without colon.',
                data: []
            }

        } else if (/^\d{2}$/.test(payload.endTime)) {
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
        }
    }

}; // end

export const CarServices = {
    createCarIntoDb,
    getAllCarsFromDb,
    getSpecificCarFromDb,
    updateSpecificCarIntoDb,
    deleteACarFromDb,
    returnCarDb
};
