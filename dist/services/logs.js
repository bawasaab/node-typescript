"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogExitsByFileId = exports.insertLogs = void 0;
const connection_1 = __importDefault(require("../db/connection"));
let obj = new connection_1.default();
const insertLogs = async (data) => {
    try {
        let db = await obj.connect();
        let result = await (0, exports.isLogExitsByFileId)(data.file_id);
        if (result && result.rows.length) {
            const [rows] = await db.execute('UPDATE logs SET user_id=?, file_id=?, last_access=? WHERE file_id=?', [data.user_id, data.file_id, data.last_access, data.file_id]);
            return {
                rows
            };
        }
        else {
            const [rows] = await db.execute('INSERT INTO logs SET user_id=?, file_id=?, last_access=?', [data.user_id, data.file_id, data.last_access]);
            return {
                rows
            };
        }
    }
    catch (ex) {
        throw ex;
    }
};
exports.insertLogs = insertLogs;
const isLogExitsByFileId = async (id) => {
    try {
        let db = await obj.connect();
        const [rows] = await db.execute('SELECT * FROM `logs` WHERE `file_id` = ?', [id]);
        return {
            rows
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.isLogExitsByFileId = isLogExitsByFileId;
