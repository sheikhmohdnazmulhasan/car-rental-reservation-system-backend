import { z } from 'zod';

const createCarValidationSchema = z.object({
    name: z.string().nonempty(), // name must not be empty
    description: z.string().nonempty(), // description must not be empty
    color: z.string().nonempty(), // color must not be empty
    isElectric: z.boolean(),
    features: z.array(z.string()), // array of strings
    pricePerHour: z.number().positive(), // price must be a positive number
});

const updateCarValidationSchema = z.object({
    name: z.string().nonempty().optional(), // name must not be empty
    description: z.string().nonempty().optional(), // description must not be empty
    color: z.string().nonempty().optional(), // color must not be empty
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(), // array of strings
    pricePerHour: z.number().positive().optional() // price must be a positive number
});



export const CarValidationSchema = { createCarValidationSchema, updateCarValidationSchema };
