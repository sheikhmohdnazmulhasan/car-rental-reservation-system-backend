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
            const userForClient = await User.findById(user._id);
            return {
                success: true,
                statusCode: httpStatus.CREATED,
                message: 'User registered successfully',
                data: userForClient
            }
        }

    } catch (error) {
        next(error);
    };

}; //end;

async function getFullUserDataFormDb(email: string, next: NextFunction) {

    try {
        const user = await User.findOne({ email });
        if (user) {
            return {
                success: true,
                statusCode: httpStatus.CREATED,
                message: 'User retrieved successfully',
                data: user
            }
        }
    } catch (error) {
        next(error)
    }
}

async function loginUser(payload: TLogin, next: NextFunction) {

    try {
        let user = await User.findOne({ email: payload?.email }).select('+password');
        if (!user) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'The email you provided did not match any accounts',
                data: null,
                token: null
            };
        };

        const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordCorrect) {
            return {
                success: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Wrong Password',
                data: null,
                token: null
            };
        };

        const tokenPayload = { user: user.email, role: user.role };
        const accessToken = jwt.sign(tokenPayload, (config.jwt_access_token as string), { expiresIn: '3d' });

        if (accessToken) {
            const refreshToken = jwt.sign(tokenPayload, (config.jwt_refresh_token as string), { expiresIn: '365d' });

            if (refreshToken) {
                const userForClient = await User.findOne({ email: payload?.email });
                return {
                    success: true,
                    statusCode: httpStatus.OK,
                    message: 'User logged in successfully',
                    data: userForClient,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            }
        };

    } catch (error) {
        next(error);
    };

}; //end

export const UserServices = { createUserIntoDb, loginUser, getFullUserDataFormDb };