"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
// Define the schema
const createCarBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        carId: zod_1.z.string().nonempty("Car ID cannot be empty"),
        date: zod_1.z.string({
            message: 'Invalid date format'
        }),
        additionalInfo: zod_1.z.object({
            nid: zod_1.z.string().nonempty("NID is required"),
            drivingLicense: zod_1.z.string().nonempty("Driving license is required"),
            extraFeatures: zod_1.z.array(zod_1.z.string()).optional()
        })
    })
});
const updateCarBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            message: 'Invalid date format'
        }).optional(),
        startTime: zod_1.z.string({
            message: "Invalid time format"
        }).optional(),
        status: zod_1.z.enum(['ongoing', 'succeed', 'canceled'], {
            message: "Status must be 'ongoing', 'succeed', or 'canceled'"
        }).optional()
    })
});
exports.BookingValidation = { updateCarBookingValidationSchema, createCarBookingValidationSchema };
