import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// test endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = err.message || 'Something Wrong';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });

});


// not found route
app.all('*', (req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        statusCode: status.NOT_FOUND,
        message: "Not Found",
    });

})

export default app;