import { RequestHandler } from "express";
import { User } from "../models/users";
import { getAllUsers, getUsersById, insertUsers, updateUsers, deleteUsersById } from "../services/users";

export const insertUser: RequestHandler = async (req, res, next) => {
    let body = (req.body as User);
    const newUser: User = new User(
        body.email,
        body.password,
        body.role
    );
    let result = await insertUsers(newUser);
    res.status(201).json({
        message: 'Created todo',
        data: newUser,
        result
    });
}

export const getAllUser: RequestHandler = async (req, res, next) => {
    let data = await getAllUsers();
    let result: User[] = data.rows;
    res.json({
        message: 'Users List',
        data: result,
    });
}

export const getUserById: RequestHandler<{id: Number}> = async (req, res, next) => {
    const userId = req.params.id;
    let data = await getUsersById(userId);
    let result: User[] = data.rows;
    res.json({
        message: 'Users Found',
        data: result,
    });
}

export const updateUser: RequestHandler<{id: Number}> = async (req, res, next) => {
    const userId = req.params.id;
    const body = (req.body as User);
    let data = await updateUsers(body, userId);
    let result: User[] = data.rows;
    res.json({
        message: 'User Updated',
        data: result,
    });
}

export const deleteUser: RequestHandler<{id: Number}> = async (req, res, next) => {
    const userId = req.params.id;
    let result = await deleteUsersById(userId);
    res.json({
        message: 'User deleted',
        result
    });
}