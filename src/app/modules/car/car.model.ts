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
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



carSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Car = mongoose.model<TCar>('Car', carSchema);
export default Car;
