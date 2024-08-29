import { z } from 'zod';

// Define the schema
const createCarBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string().nonempty("Car ID cannot be empty"),
    date: z.string({
      message: 'Invalid date format'
    }),
    startTime: z.string({
      message: "Invalid time format"
    }),
    // additionalInfo: z.object({
    //   // nid: z.string().nonempty("NID is required"),
    //   // drivingLicense: z.string().nonempty("Driving license is required"),
    //   extraFeatures: z.array(z.string()).optional()
    // })
  })
})

export const BookingValidation = { createCarBookingValidationSchema }