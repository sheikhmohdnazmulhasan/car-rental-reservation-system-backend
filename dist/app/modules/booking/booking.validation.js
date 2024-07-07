"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
// Define the schema
const createCarBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        carId: zod_1.z.string().nonempty("Car ID cannot be empty"),
        date: zod_1.z.string({ message: 'Invalid date format' }),
        startTime: zod_1.z.string({
            message: "Invalid time format",
        })
    })
});
exports.BookingValidation = { createCarBookingValidationSchema };
