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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function Auth(role) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });
        }
        ;
        const extractToken = authHeader.slice(7);
        jsonwebtoken_1.default.verify(extractToken, config_1.default.jwt_access_token, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route'
                });
            }
            else {
                const payload = decoded;
                if (payload.role !== role) {
                    return res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: `You have no access to this route`
                    });
                }
                else {
                    req.user = decoded;
                    next();
                }
            }
            ;
        });
    });
}
;
exports.default = Auth;
