import { NextFunction } from "express";
import { TLogin, TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import verifyTokenSync from "../../../utils/verifyTokenSync";

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
                statusCode: httpStatus.OK,
                message: 'User retrieved successfully',
                data: user
            }
        }
    } catch (error) {
        next(error)
    }
};

async function getUserForRecoverAccountFormDb(email: string, next: NextFunction) {
    try {
        const user: TUser | null = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ email: user?.email }, (config.jwt_access_token as string), { expiresIn: '15m' });
            if (!token) {
                return {
                    success: false,
                    statusCode: httpStatus.OK,
                    message: 'something went wrong',
                    data: []
                }
            }

            const resBody = {
                name: user?.name,
                email: user?.email,
                photo: user?.photo,
                token,
            }
            return {
                success: true,
                statusCode: httpStatus.OK,
                message: 'User retrieved successfully',
                data: resBody
            }

        } else {
            return {
                success: false,
                statusCode: httpStatus.OK,
                message: 'User Not Found',
                data: []
            }
        }
    } catch (error) {
        next(error);
    }
}

async function recoverAccountFromDb(payload: { token: string, newPassword: string }, next: NextFunction) {
    try {
        const decoded = verifyTokenSync(payload.token, config.jwt_access_token as string);

        if (!decoded || !decoded.email) {
            return {
                success: false,
                message: 'OTP Expired',
            };
        }

        const email = decoded.email;
        const encryptedNewPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

        if (encryptedNewPassword) {
            const updateUser = await User.findOneAndUpdate({ email }, { password: encryptedNewPassword });

            if (updateUser) {
                return {
                    success: true,
                    message: 'Account recovered successfully',
                };
            } else {
                return {
                    success: false,
                    message: 'Something went wrong',
                };
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong',
            };
        }
    } catch (error) {
        next(error);
    }
}

async function updateSpecificUserIntoDb(payload: Partial<TUser>, email: string, next: NextFunction) {

    try {
        const res = await User.findOneAndUpdate({ email }, payload, { new: true });
        if (res) {
            return {
                success: true,
                statusCode: httpStatus.OK,
                message: 'User Update successfully',
                data: res
            }
        }
    } catch (error) {
        next(error)
    }
}

async function getRoleBaseUserFormDb(role: string, next: NextFunction) {

    try {
        const res = await User.find({ role });
        if (res) {
            return {
                success: true,
                statusCode: httpStatus.OK,
                message: `${role}s retrieved successfully`,
                data: res
            }
        }
    } catch (error) {
        next(error);
    }
}

async function changeUserRoleIntoBd(payload: { _id: string; role: string }, next: NextFunction) {

    try {
        const res = await User.findByIdAndUpdate(payload._id, { role: payload?.role }, { new: true });
        if (res) {
            return {
                success: true,
                statusCode: httpStatus.OK,
                message: `user role changed to ${payload?.role}`,
                data: res
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

export const UserServices = {
    createUserIntoDb,
    loginUser,
    getFullUserDataFormDb,
    updateSpecificUserIntoDb,
    getRoleBaseUserFormDb,
    changeUserRoleIntoBd,
    getUserForRecoverAccountFormDb,
    recoverAccountFromDb
};