import { NextFunction } from "express";
import { TLogin, TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";

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
        let user = await User.findOne({ email: payload?.email }).select('+password');

        if (!user) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'The email you provided did not match any accounts', data: null, token: null };

        };

        const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordCorrect) {
            return { success: false, statusCode: httpStatus.BAD_REQUEST, message: 'Wrong Password', data: null, token: null };
        };

        const dataForToken = { user: user.email, role: user.role };

        const accessToken = jwt.sign(dataForToken, (config.jwt_access_token as string), { expiresIn: '3d' });

        return { success: true, statusCode: httpStatus.OK, message: 'User logged in successfully', data: user, token: accessToken }

    } catch (error) {
        next(error);
    };

}; //end

export const UserServices = { createUserIntoDb, loginUser };