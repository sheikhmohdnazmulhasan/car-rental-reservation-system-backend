import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { NextFunction } from "express";

async function createBookingIntoDb(user: JwtPayload, payload: TBooking,  next: NextFunction) {
    console.log(payload);
    console.log(user);

};

export const BookingServices = { createBookingIntoDb };