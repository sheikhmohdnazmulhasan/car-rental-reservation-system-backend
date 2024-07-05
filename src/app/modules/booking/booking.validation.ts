import { z } from 'zod';

// Define the schema
const createCarBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string().nonempty("Car ID cannot be empty"),
    date: z.string({ message: 'Invalid date format' }),

    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: "Invalid time format",
    }),
  })
});

export const BookingValidationSchema = { createCarBookingValidationSchema }