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

}; //end;

async function getAllCarsFromDb(next: NextFunction) {

    try {
        const allData = await Car.find({ isDeleted: false });

        if (allData.length) {
            return { success: true, statusCode: 200, message: 'Cars retrieved successfully', data: allData }

        } else {
            return { success: false, statusCode: 404, message: 'No Data Found', data: [] }

        };

    } catch (error) {
        next(error)
    };

}; //end;

async function getSpecificCarFromDb(query: string, next: NextFunction) {

    try {
        const car = await Car.findOne({ _id: query, isDeleted: false });

        if (car) {
            return { success: true, statusCode: 200, message: 'A Car retrieved successfully', data: car }

        } else {
            return { success: false, statusCode: 404, message: 'No Data Found', data: [] }

        }

    } catch (error) {
        next(error);
    };

}//end;

async function updateSpecificCarIntoDb(query: string, payload: TCar, next: NextFunction) {

    try {
        const updatedData = await Car.findByIdAndUpdate(query, payload, { new: true });

        if (updatedData) {
            return { success: true, statusCode: 200, message: 'Car updated successfully', data: updatedData };

        } else {
            return { success: false, statusCode: 404, message: 'No Data Found', data: [] }
        }

    } catch (error) {
        next(error);
    };

}; //end;

async function deleteACarFromDb(query: string) {

    try {
        const result = await Car.findByIdAndUpdate(query, { isDeleted: true });

        console.log(result);

    } catch (error) {

    };

}; //end

export const CarServices = { createCarIntoDb, getAllCarsFromDb, getSpecificCarFromDb, updateSpecificCarIntoDb, deleteACarFromDb };
