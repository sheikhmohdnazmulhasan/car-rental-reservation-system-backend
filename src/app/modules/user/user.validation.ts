import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({ message: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
        address: z.string(),
        phone: z.string({ message: 'invalid phone number' }),
        password: z.string()
    })
});

export const UserValidation = { createUserValidationSchema };
