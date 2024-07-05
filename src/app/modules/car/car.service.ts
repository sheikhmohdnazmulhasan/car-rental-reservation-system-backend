import { NextFunction } from "express";
import { TCar } from "./car.interface";
import Car from "./car.model";
import httpStatus from "http-status";

async function createCarIntoDb(payload: TCar, next: NextFunction) {

    try {
        const newCar = await Car.create(payload);

        if (newCar) {
            return { success: true, statusCode: httpStatus.CREATED, message: 'Car created successfully', data: newCar }
        };

    } catch (error) {
        next(error);
    };

}; //end

export const CarServices = { createCarIntoDb };
