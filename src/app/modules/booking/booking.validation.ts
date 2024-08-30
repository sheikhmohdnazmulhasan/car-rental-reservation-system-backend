import { z } from 'zod';

// Define the schema
const createCarBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string().nonempty("Car ID cannot be empty"),
    date: z.string({
      message: 'Invalid date format'
    }),
    additionalInfo: z.object({
      nid: z.string().nonempty("NID is required"),
      drivingLicense: z.string().nonempty("Driving license is required"),
      extraFeatures: z.array(z.string()).optional()
    })
  })
})

const updateCarBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      message: 'Invalid date format'
    }).optional(),
    startTime: z.string({
      message: "Invalid time format"
    }).optional(),
    status: z.enum(['ongoing', 'succeed', 'canceled'], {
      message: "Status must be 'ongoing', 'succeed', or 'canceled'"
    }).optional()
  })
})


export const BookingValidation = { updateCarBookingValidationSchema, createCarBookingValidationSchema }