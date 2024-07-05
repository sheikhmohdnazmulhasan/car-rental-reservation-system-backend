import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config";
function Auth(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.send(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });
        };

        const extractToken = authHeader.slice(7);

        jwt.verify(extractToken, (config.jwt_access_token as string), (err, decoded) => {
            
        });

        next();

    };
};

export default Auth;