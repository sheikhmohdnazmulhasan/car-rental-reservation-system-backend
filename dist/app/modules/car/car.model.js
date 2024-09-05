"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
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
    fuelType: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
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
    location: {
        type: String,
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
const Car = mongoose_1.default.model('Car', carSchema);
exports.default = Car;
