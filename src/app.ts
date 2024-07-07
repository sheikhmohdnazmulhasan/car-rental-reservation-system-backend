import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import { UserRoute } from './app/modules/user/user.route';
import { CarRoutes } from './app/modules/car/car.route';
import { BookingRoutes } from './app/modules/booking/booking.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// test endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// application route;
app.use('/api/auth', UserRoute);
app.use('/api/cars', CarRoutes);
app.use('/api/bookings', BookingRoutes);

// global error handler
app.use(globalErrorHandler);

// not found route
app.all('*', (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        statusCode: status.NOT_FOUND,
        message: "Not Found",
    });

})

export default app;