import { NextFunction, Request, Response } from "express";
import User from "../modules/user/user.model";
import httpStatus from "http-status";

function CheckUniqueEmail() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const isEmailExist = await User.findOne({ email: req.body.email });

        if (isEmailExist) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Email already registered'
            });

        } else {
            return next();
        };
    }
};

export default CheckUniqueEmail;