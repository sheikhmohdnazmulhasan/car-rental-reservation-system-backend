import mongoose, { Schema } from "mongoose"
import { TBooking } from "./booking.interface"

const bookingSchema = new mongoose.Schema<TBooking>({
    date: { type: String, required: true },
    startTime: { type: String, required: false, default: null },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    car: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'succeed', 'canceled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['verified', 'unverified'],
        default: 'unverified'
    },
    additionalInfo: {
        nid: { type: String, required: true },
        drivingLicense: { type: String, required: true },
        extraFeatures: { type: [String], required: false },
    },
}, { timestamps: true });

bookingSchema.methods.toJSON = function () {
    const obj = this.toObject();
    // delete obj.password;
    delete obj.__v;
    return obj
};

const Booking = mongoose.model<TBooking>('Booking', bookingSchema);
export default Booking;

