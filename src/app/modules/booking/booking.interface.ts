import { Types } from "mongoose";

interface TAdditionalInfo {
    nid: string;
    drivingLicense: string;
    extraFeatures: string[]
}
export interface TBooking {
    date: string;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string | null;
    totalCost: number;
    status: 'pending' | 'ongoing' | 'succeed' | 'canceled';
    paymentStatus: 'verified' | 'unverified';
    additionalInfo: TAdditionalInfo;
};