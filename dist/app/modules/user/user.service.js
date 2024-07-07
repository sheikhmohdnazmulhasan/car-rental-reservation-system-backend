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
exports.UserServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
function createUserIntoDb(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(payload);
            if (user) {
                const userForClient = yield user_model_1.default.findById(user._id);
                return { success: true, statusCode: http_status_1.default.CREATED, message: 'User registered successfully', data: userForClient };
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function loginUser(payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
            if (!user) {
                return { success: false, statusCode: http_status_1.default.BAD_REQUEST, message: 'The email you provided did not match any accounts', data: null, token: null };
            }
            ;
            const isPasswordCorrect = yield bcrypt_1.default.compare(payload.password, user.password);
            if (!isPasswordCorrect) {
                return { success: false, statusCode: http_status_1.default.BAD_REQUEST, message: 'Wrong Password', data: null, token: null };
            }
            ;
            const tokenPayload = { user: user.email, role: user.role };
            const accessToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt_access_token, { expiresIn: '3d' });
            if (accessToken) {
                const refreshToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt_refresh_token, { expiresIn: '365d' });
                if (refreshToken) {
                    const userForClient = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                    return { success: true, statusCode: http_status_1.default.OK, message: 'User logged in successfully', data: userForClient, accessToken: accessToken, refreshToken: refreshToken };
                }
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
exports.UserServices = { createUserIntoDb, loginUser };
