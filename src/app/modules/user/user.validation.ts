import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({ message: "Name is required" }),
        photo: z.string().optional(),
        email: z.string().email({ message: "Invalid email address" }),
        role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
        address: z.string().optional(),
        phone: z.string({ message: 'invalid phone number' }).optional(),
        password: z.string()
    })
});

const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        photo: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        password: z.string().optional()
    })
});

const loginUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Invalid Email' }),
        password: z.string()
    })
})

export const UserValidation = { createUserValidationSchema, loginUserValidationSchema, updateUserValidationSchema };
