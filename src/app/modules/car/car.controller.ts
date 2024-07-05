import { NextFunction, Request, Response } from "express";
import { CarServices } from "./car.service";

async function createCar(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await CarServices.createCarIntoDb(req.body, next);

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


async function getAllCars(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await CarServices.getAllCarsFromDb(next);

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
}

export const CarControllers = { createCar, getAllCars } 