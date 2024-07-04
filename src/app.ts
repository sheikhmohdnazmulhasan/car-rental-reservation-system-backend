import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// test endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// not found route
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
    
})

export default app;