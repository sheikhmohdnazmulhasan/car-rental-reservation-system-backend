import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";

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

async function getFullUserObj(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const { email } = req.query;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'You have no access to this route'
        });
    }

    const extractToken = authHeader.slice(7);

    jwt.verify(extractToken, (config.jwt_access_token as string), async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });

        } else {
            if ((decoded as JwtPayload).user !== email) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: `You have no access to this route`
                });
            } else {

                try {
                    const result = await UserServices.getFullUserDataFormDb(email as string, next);
                    if (result) {
                        res.status(result.statusCode).json({
                            success: result.success,
                            statusCode: result.statusCode,
                            message: result.message,
                            data: result.data,
                        });
                    };

                } catch (error) {
                    next(error)
                }
            }
        }
    })
};

async function recoverAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await UserServices.recoverAccountFromDb(req.body, next);
        if (result) {
            res.json({
                success: result.success,
                message: result.message
            })
        }
    } catch (error) {
        next(error);
    };
};

async function getUserForRecoverAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await UserServices.getUserForRecoverAccountFormDb(req.query?.email as string, next);
        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });
        }
    } catch (error) {
        next(error)
    }
}

async function updateSpecificUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const { email } = req.query;

    if (req.body.role || req.body.email) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: `Role and email cannot be changed. Contact admin if it is important`
        });
    }

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'You have no access to this route'
        });
    }

    const extractToken = authHeader.slice(7);

    jwt.verify(extractToken, (config.jwt_access_token as string), async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });

        } else {
            if ((decoded as JwtPayload).user !== email) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: `You have no access to this route`
                });
            } else {
                try {
                    const result = await UserServices.updateSpecificUserIntoDb(req.body, email as string, next)
                    if (result) {
                        res.status(result.statusCode).json({
                            success: result.success,
                            statusCode: result.statusCode,
                            message: result.message,
                            data: result.data,
                        });
                    };

                } catch (error) {
                    next(error)
                }
            }
        }
    })
}

async function getRoleBaseUser(req: Request, res: Response, next: NextFunction) {

    if (req?.query?.role !== 'admin' && req.query.role !== 'user') {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: `role must be admin or user`
        });
    };

    try {
        const result = await UserServices.getRoleBaseUserFormDb(req?.query?.role as string, next);
        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });
        };
    } catch (error) {
        next(error)
    };
};

async function changeUserRole(req: Request, res: Response, next: NextFunction) {

    try {
        const result = await UserServices.changeUserRoleIntoBd(req.body, next);
        if (result) {
            res.status(result.statusCode).json({
                success: result.success,
                statusCode: result.statusCode,
                message: result.message,
                data: result.data,
            });
        };
    } catch (error) {
        next(error)
    }
}

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

export const UserControllers = {
    createUser,
    loginUser,
    getFullUserObj,
    updateSpecificUser,
    getRoleBaseUser,
    changeUserRole,
    getUserForRecoverAccount,
    recoverAccount,
};

