import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todosRouter from "./routes/todos";
import jetDevsRouter from "./routes/jetDevs";

const app = express();

app.use(json());

app.use('/todos', todosRouter);
app.use('/jetdevs', jetDevsRouter);

app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        msg: err.message
    });
} );

app.listen(3000);

