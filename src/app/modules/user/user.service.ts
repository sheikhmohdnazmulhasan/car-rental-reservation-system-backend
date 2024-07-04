import { NextFunction } from "express";
import { TLogin, TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";

async function createUserIntoDb(payload: TUser, next: NextFunction) {

    try {
        const user = await User.create(payload);

        if (user) {
            return { success: true, statusCode: httpStatus.CREATED, message: 'User registered successfully', data: user }
        }

    } catch (error) {
        next(error);
    };

}; //end;

async function loginUser(payload: TLogin, next: NextFunction) {

    try {
        const user = await User.findOne({ email: payload?.email });

        console.log(user);

    } catch (error) {
        next(error);
    };

}; //end

export const UserServices = { createUserIntoDb, loginUser };