"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUser = exports.insertUser = void 0;
const users_1 = require("../models/users");
const users_2 = require("../services/users");
const insertUser = async (req, res, next) => {
    let body = req.body;
    const newUser = new users_1.User(body.email, body.password, body.role);
    let result = await (0, users_2.insertUsers)(newUser);
    res.status(201).json({
        message: 'Created todo',
        data: newUser,
        result
    });
};
exports.insertUser = insertUser;
const getAllUser = async (req, res, next) => {
    let data = await (0, users_2.getAllUsers)();
    let result = data.rows;
    res.json({
        message: 'Users List',
        data: result,
    });
};
exports.getAllUser = getAllUser;
const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    let data = await (0, users_2.getUsersById)(userId);
    let result = data.rows;
    res.json({
        message: 'Users Found',
        data: result,
    });
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const body = req.body;
    let data = await (0, users_2.updateUsers)(body, userId);
    let result = data.rows;
    res.json({
        message: 'User Updated',
        data: result,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    let result = await (0, users_2.deleteUsersById)(userId);
    res.json({
        message: 'User deleted',
        result
    });
};
exports.deleteUser = deleteUser;
