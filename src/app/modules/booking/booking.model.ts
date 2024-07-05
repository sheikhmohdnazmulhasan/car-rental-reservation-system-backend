import mongoose, { Schema } from "mongoose"
import { TBooking } from "./booking.interface"

const bookingSchema = new mongoose.Schema<TBooking>({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    car: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });


bookingSchema.methods.toJSON = function () {
    const obj = this.toObject();
    // delete obj.password;
    delete obj.__v;
    return obj
};

const Booking = mongoose.model<TBooking>('Booking', bookingSchema);
export default Booking;

