import express, { Request, Response, NextFunction } from "express";
import Path from "path";
import { json, urlencoded } from "body-parser";
import todosRouter from "./routes/todos";
import jetDevsRouter from "./routes/jetDevs";
import usersRouter from "./routes/users";
import authsRouter from "./routes/auths";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/uploads", express.static(Path.join(__dirname, '/uploads')));

app.use('/todos', todosRouter);
app.use('/jetdevs', jetDevsRouter);
app.use('/users', usersRouter);
app.use('/auth', authsRouter);

app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        msg: err.message
    });
} );

app.listen(3000);

