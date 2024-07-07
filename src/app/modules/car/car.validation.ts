import { z } from 'zod';

const createCarValidationSchema = z.object({

    body: z.object({
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a string"
            })
            .min(2, "Name must be at least 2 characters"),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            }),
        color: z
            .string({
                required_error: "Color is required",
                invalid_type_error: "Color must be a string"
            }),
        isElectric: z
            .boolean({
                required_error: "isElectric is required",
                invalid_type_error: "isElectric must be a boolean"
            }),
        features: z
            .array(z.string({
                required_error: "Each feature is required",
                invalid_type_error: "Each feature must be a string"
            }), {
                required_error: "Features are required",
                invalid_type_error: "Features must be an array of strings"
            }),
        pricePerHour: z
            .number({
                required_error: "Price per hour is required",
                invalid_type_error: "Price per hour must be a number"
            })
            .positive("Price per hour must be a positive number"),
    })
});

const updateCarValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a string"
            })
            .min(2, "Name must be at least 2 characters").optional(),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string"
            }).optional(),
        color: z
            .string({
                required_error: "Color is required",
                invalid_type_error: "Color must be a string"
            }).optional(),
        isElectric: z
            .boolean({
                required_error: "isElectric is required",
                invalid_type_error: "isElectric must be a boolean"
            }).optional(),
        features: z
            .array(z.string({
                required_error: "Each feature is required",
                invalid_type_error: "Each feature must be a string"
            }), {
                required_error: "Features are required",
                invalid_type_error: "Features must be an array of strings"
            }).optional(),
        pricePerHour: z
            .number({
                required_error: "Price per hour is required",
                invalid_type_error: "Price per hour must be a number"
            })
            .positive("Price per hour must be a positive number").optional(),
    })
});



export const CarValidationSchema = { createCarValidationSchema, updateCarValidationSchema };
