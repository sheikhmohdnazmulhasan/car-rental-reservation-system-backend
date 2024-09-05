"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStatistics = void 0;
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const car_model_1 = __importDefault(require("../car/car.model"));
function statistics(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {};
        try {
            // Total Bookings
            result.total_booking = yield booking_model_1.default.countDocuments();
            // total vehicles
            result.total_vehicles = yield car_model_1.default.countDocuments({ isDeleted: false });
            // total revenue
            result.total_revenue = (yield booking_model_1.default.find())
                .filter(booking => booking.totalCost > 0) // Filter out negative values
                .reduce((acc, booking) => booking.totalCost + acc, 0);
            if (!result.total_booking || !result.total_vehicles || !result.total_revenue) {
                res.status(400).json({
                    success: false,
                    message: 'admin statistics fetched Unsuccessful',
                    data: []
                });
            }
            res.status(200).json({
                success: true,
                message: 'admin statistics fetched successfully',
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.adminStatistics = { statistics };
