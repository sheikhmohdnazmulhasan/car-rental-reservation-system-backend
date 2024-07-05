import mongoose, { Schema } from "mongoose"
import { TBooking } from "./booking.interface"

const bookingSchema = new mongoose.Schema<TBooking>({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: null, default: null },
    totalCost: { type: Number, default: 0 },
    car: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId }
}, { timestamps: true });

const Booking = mongoose.model<TBooking>('booking', bookingSchema);
export default Booking;

