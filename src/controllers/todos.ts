import { RequestHandler } from "express";
import { Todos } from "../models/todos";

const TODOS: Todos[] = [];

export const createTodos: RequestHandler = (req, res, next) => {
    let text = req.body.text;
    const newTodo = new Todos(
        Math.random().toString(),
        text
    );

    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Created todo',
        createTodo: newTodo
    });
}