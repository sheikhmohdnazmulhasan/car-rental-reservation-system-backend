"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_service_1.UserServices.createUserIntoDb(req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end
function getFullUserObj(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
        jsonwebtoken_1.default.verify(extractToken, config_1.default.jwt_access_token, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route'
                });
            }
            else {
                if (decoded.user !== email) {
                    return res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: `You have no access to this route`
                    });
                }
                else {
                    try {
                        const result = yield user_service_1.UserServices.getFullUserDataFormDb(email, next);
                        if (result) {
                            res.status(result.statusCode).json({
                                success: result.success,
                                statusCode: result.statusCode,
                                message: result.message,
                                data: result.data,
                            });
                        }
                        ;
                    }
                    catch (error) {
                        next(error);
                    }
                }
            }
        }));
    });
}
;
function recoverAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_service_1.UserServices.recoverAccountFromDb(req.body, next);
            if (result) {
                res.json({
                    success: result.success,
                    message: result.message
                });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
;
function getUserForRecoverAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const result = yield user_service_1.UserServices.getUserForRecoverAccountFormDb((_a = req.query) === null || _a === void 0 ? void 0 : _a.email, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function updateSpecificUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
        jsonwebtoken_1.default.verify(extractToken, config_1.default.jwt_access_token, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route'
                });
            }
            else {
                if (decoded.user !== email) {
                    return res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: `You have no access to this route`
                    });
                }
                else {
                    try {
                        const result = yield user_service_1.UserServices.updateSpecificUserIntoDb(req.body, email, next);
                        if (result) {
                            res.status(result.statusCode).json({
                                success: result.success,
                                statusCode: result.statusCode,
                                message: result.message,
                                data: result.data,
                            });
                        }
                        ;
                    }
                    catch (error) {
                        next(error);
                    }
                }
            }
        }));
    });
}
function getRoleBaseUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.role) !== 'admin' && req.query.role !== 'user') {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: `role must be admin or user`
            });
        }
        ;
        try {
            const result = yield user_service_1.UserServices.getRoleBaseUserFormDb((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.role, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
;
function changeUserRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_service_1.UserServices.changeUserRoleIntoBd(req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
    });
}
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield user_service_1.UserServices.loginUser(req.body, next);
            if (result) {
                res.cookie('refreshToken', result === null || result === void 0 ? void 0 : result.refreshToken, {
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
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
;
exports.UserControllers = {
    createUser,
    loginUser,
    getFullUserObj,
    updateSpecificUser,
    getRoleBaseUser,
    changeUserRole,
    getUserForRecoverAccount,
    recoverAccount,
};
