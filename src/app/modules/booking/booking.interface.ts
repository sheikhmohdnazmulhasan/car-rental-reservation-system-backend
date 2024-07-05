import { Types } from "mongoose";

export interface TBooking {
    date: string;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
};