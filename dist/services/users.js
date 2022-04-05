"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersById = exports.updateUsers = exports.insertUsers = exports.getUsersById = exports.getAllUsers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
let obj = new connection_1.default();
const getAllUsers = async () => {
    try {
        let db = await obj.connect();
        const [rows, fields] = await db.execute('SELECT * FROM `users`', []);
        return {
            rows,
            // fields
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.getAllUsers = getAllUsers;
const getUsersById = async (id) => {
    let db = await obj.connect();
    const [rows, fields] = await db.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
    return {
        rows,
        // fields
    };
};
exports.getUsersById = getUsersById;
const insertUsers = async (data) => {
    try {
        let db = await obj.connect();
        const [rows] = await db.execute('INSERT INTO users SET email=?, password=?, role=?', [data.email, data.password, data.role]);
        return {
            rows
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.insertUsers = insertUsers;
const updateUsers = async (data, id) => {
    try {
        let db = await obj.connect();
        const [rows] = await db.execute('UPDATE users SET email=?, password=?, role=? where id=?', [data.email, data.password, data.role, id]);
        return {
            rows
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.updateUsers = updateUsers;
const deleteUsersById = async (id) => {
    let db = await obj.connect();
    const [rows, fields] = await db.execute('DELETE FROM `users` WHERE `id` = ?', [id]);
    return {
        rows,
        // fields
    };
};
exports.deleteUsersById = deleteUsersById;
