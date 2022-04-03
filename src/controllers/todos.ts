import { RequestHandler } from "express";
import { Todos } from "../models/todos";

const TODOS: Todos[] = [];

export const createTodos: RequestHandler = (req, res, next) => {
    let text = (req.body as {text: string}).text;
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

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({
        todos: TODOS
    });
}

export const updateTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as {text: string}).text;
    const todoIndex = TODOS.findIndex(todo => todo.id == todoId);
    if( todoIndex < 0 ) {
        throw new Error('Could not find todo');
    }
    
    TODOS[todoIndex] = new Todos(
        TODOS[todoIndex].id,
        updatedText
    );

    res.json({
        message: 'Updated todo',
        updatedTodo: TODOS[todoIndex]
    });
}

export const deleteTodos: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id == todoId);
    if( todoIndex < 0 ) {
        throw new Error('Could not find todo');
    }
    
    TODOS.splice(todoIndex, 1);
    res.json({
        message: 'Todo deleted'
    });
}