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
exports.stripe = stripe;
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
function stripe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripe = new stripe_1.default(config_1.default.stripe_secret);
        const user = req.user;
        const { booking } = req.query;
        let amount;
        try {
            // validation logic
            const bookingObj = yield booking_model_1.default.findById(booking).populate('user');
            if (!bookingObj) {
                return res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    message: 'Booking not found'
                });
            }
            ;
            if ((bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.status) !== 'succeed' || bookingObj.paymentStatus !== 'unverified') {
                res.status(http_status_1.default.EXPECTATION_FAILED).json({
                    success: false,
                    message: 'booking is not successful or the payment is already completed'
                });
            }
            ;
            if (user.user !== (bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.user.email)) {
                res.status(http_status_1.default.BAD_REQUEST).json({
                    success: false,
                    message: "Don't try to be too generous. You cannot make payments on someone else's booking. Not event GF/BF"
                });
            }
            ;
            amount = Number(parseFloat(String((bookingObj === null || bookingObj === void 0 ? void 0 : bookingObj.totalCost) * 100)).toFixed(2));
            // stripe logic
            try {
                const paymentIntent = yield stripe.paymentIntents.create({
                    amount,
                    currency: 'usd'
                });
                res.status(200).json({
                    success: true,
                    clientSecret: paymentIntent.client_secret,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'error creating stripe payment intent'
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
