import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

async function createUser(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await UserServices.createUserIntoDb(req.body, next)
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

async function loginUser(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await UserServices.loginUser(req.body, next);
        if (result) {
            res.cookie('refreshToken', result?.refreshToken, {
                secure: false,
                httpOnly: true
            });

            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
                token: result.accessToken,
            });
        };

    } catch (error) {
        next(error)
    };
};

export const UserControllers = { createUser, loginUser };

