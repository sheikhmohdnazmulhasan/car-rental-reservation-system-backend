import mongoose from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new mongoose.Schema<TCar>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    isElectric: {
        type: Boolean,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
});

const Car = mongoose.model<TCar>('car', carSchema);
export default Car;
