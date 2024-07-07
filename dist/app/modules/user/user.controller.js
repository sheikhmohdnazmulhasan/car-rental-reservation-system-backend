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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
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
            next();
        }
        ;
    });
}
;
exports.UserControllers = { createUser, loginUser };
