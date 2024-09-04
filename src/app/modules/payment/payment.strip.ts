import { NextFunction, Request, Response } from "express";
import Booking from "../booking/booking.model";
import httpStatus from "http-status";
import Stripe from 'stripe';
import config from "../../config";

export async function stripe(req: Request, res: Response, next: NextFunction) {
    const stripe = new Stripe(config.stripe_secret as string);
    const user = req.user;
    const { booking } = req.query;
    let amount: number;

    try {
        // validation logic
        const bookingObj = await Booking.findById(booking).populate<{ user: { email: string } }>('user');
        if (!bookingObj) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Booking not found'
            });
        };
        if (bookingObj?.status !== 'succeed' || bookingObj.paymentStatus !== 'unverified') {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'booking is not successful or the payment is already complete'
            });
        };
        if (user.user !== bookingObj?.user.email) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Don't try to be too generous. You cannot make payments on someone else's booking"
            })
        };
        amount = bookingObj?.totalCost * 100;

        // stripe logic
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd'
            });
            res.status(200).json({
                success: true,
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'error creating stripe payment intent'
            });
        }
    } catch (error) {
        next(error)
    }
}