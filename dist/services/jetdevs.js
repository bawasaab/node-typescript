"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.insertTest = exports.getTest = void 0;
const connection_1 = __importDefault(require("../db/connection"));
let obj = new connection_1.default();
const getTest = async (data) => {
    try {
        let obj = new connection_1.default();
        let db = await obj.connect();
        const [rows, fields] = await db.execute('SELECT * FROM `fileuploads` WHERE `id` = ?', [1]);
        return {
            rows,
            // fields
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.getTest = getTest;
const insertTest = async (data) => {
    try {
        let obj = new connection_1.default();
        let db = await obj.connect();
        const [rows] = await db.execute('INSERT INTO fileuploads SET data=?, filepath=?', [data.data, data.filepath]);
        return {
            rows
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.insertTest = insertTest;
const insert = async (data) => {
    try {
        let db = await obj.connect();
        const [rows] = await db.execute('INSERT INTO fileuploads SET data=?, filepath=?', [data.data, data.filepath]);
        return {
            rows
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.insert = insert;
