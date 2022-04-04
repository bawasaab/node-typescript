"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodos = exports.getTodos = exports.createTodos = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodos = (req, res, next) => {
    let text = req.body.text;
    const newTodo = new todos_1.Todos(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Created todo',
        createTodo: newTodo
    });
};
exports.createTodos = createTodos;
const getTodos = (req, res, next) => {
    res.json({
        todos: TODOS
    });
};
exports.getTodos = getTodos;
const updateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id == todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS[todoIndex] = new todos_1.Todos(TODOS[todoIndex].id, updatedText);
    res.json({
        message: 'Updated todo',
        updatedTodo: TODOS[todoIndex]
    });
};
exports.updateTodos = updateTodos;
const deleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id == todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOS.splice(todoIndex, 1);
    res.json({
        message: 'Todo deleted'
    });
};
exports.deleteTodos = deleteTodos;
