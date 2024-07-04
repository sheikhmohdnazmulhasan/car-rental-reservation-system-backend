import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

async function createUser(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await UserServices.createUserIntoDb(req.body, next);

        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
                data: result.data,
            });
        };

    } catch (error) {
        next(error)
    };

}; //end

export const UserControllers = { createUser };