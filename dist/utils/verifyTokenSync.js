"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyTokenSync(token, secret) {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        // console.error('Token verification failed:', err);
        return null;
    }
}
exports.default = verifyTokenSync;
