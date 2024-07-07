"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const user_route_1 = require("./app/modules/user/user.route");
const car_route_1 = require("./app/modules/car/car.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// test endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// application route;
app.use('/api/auth', user_route_1.UserRoute);
app.use('/api/cars', car_route_1.CarRoutes);
app.use('/api/bookings', booking_route_1.BookingRoutes);
// global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// not found route
app.all('*', (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        statusCode: http_status_1.default.NOT_FOUND,
        message: "Not Found",
    });
});
exports.default = app;
