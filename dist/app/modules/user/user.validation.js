"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: "Name is required" }),
        photo: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        role: zod_1.z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
        address: zod_1.z.string().optional(),
        phone: zod_1.z.string({ message: 'invalid phone number' }).optional(),
        password: zod_1.z.string()
    })
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        photo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        password: zod_1.z.string().optional()
    })
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid Email' }),
        password: zod_1.z.string()
    })
});
exports.UserValidation = { createUserValidationSchema, loginUserValidationSchema, updateUserValidationSchema };
