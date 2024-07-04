import { z } from 'zod';

const createUserValidationSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }),
    address: z.string().optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const UserValidation = { createUserValidationSchema };
