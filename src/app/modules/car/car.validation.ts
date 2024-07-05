import { z } from 'zod';

const createCarValidationSchema = z.object({
    name: z.string().nonempty(), // name must not be empty
    description: z.string().nonempty(), // description must not be empty
    color: z.string().nonempty(), // color must not be empty
    isElectric: z.boolean(),
    features: z.array(z.string()), // array of strings
    pricePerHour: z.number().positive(), // price must be a positive number
});

export const CarValidationSchema = { createCarValidationSchema };
