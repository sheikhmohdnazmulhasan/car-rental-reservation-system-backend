"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidationSchema = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        })
            .min(2, "Name must be at least 2 characters"),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string"
        }),
        color: zod_1.z
            .string({
            required_error: "Color is required",
            invalid_type_error: "Color must be a string"
        }),
        isElectric: zod_1.z
            .boolean({
            required_error: "isElectric is required",
            invalid_type_error: "isElectric must be a boolean"
        }),
        features: zod_1.z
            .array(zod_1.z.string({
            required_error: "Each feature is required",
            invalid_type_error: "Each feature must be a string"
        }), {
            required_error: "Features are required",
            invalid_type_error: "Features must be an array of strings"
        }),
        pricePerHour: zod_1.z
            .number({
            required_error: "Price per hour is required",
            invalid_type_error: "Price per hour must be a number"
        })
            .positive("Price per hour must be a positive number"),
    })
});
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        })
            .min(2, "Name must be at least 2 characters").optional(),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string"
        }).optional(),
        color: zod_1.z
            .string({
            required_error: "Color is required",
            invalid_type_error: "Color must be a string"
        }).optional(),
        isElectric: zod_1.z
            .boolean({
            required_error: "isElectric is required",
            invalid_type_error: "isElectric must be a boolean"
        }).optional(),
        features: zod_1.z
            .array(zod_1.z.string({
            required_error: "Each feature is required",
            invalid_type_error: "Each feature must be a string"
        }), {
            required_error: "Features are required",
            invalid_type_error: "Features must be an array of strings"
        }).optional(),
        pricePerHour: zod_1.z
            .number({
            required_error: "Price per hour is required",
            invalid_type_error: "Price per hour must be a number"
        })
            .positive("Price per hour must be a positive number").optional(),
    })
});
exports.CarValidationSchema = { createCarValidationSchema, updateCarValidationSchema };
