"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.deleteById = exports.getById = exports.getFileRecords = exports.insert = exports.insertTest = exports.getTest = void 0;
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
const getFileRecords = async () => {
    try {
        let db = await obj.connect();
        const [rows, fields] = await db.execute('SELECT * FROM `fileuploads`', []);
        return {
            rows,
            // fields
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.getFileRecords = getFileRecords;
const getById = async (id) => {
    let db = await obj.connect();
    // const [rows, fields] = await db.execute('SELECT * FROM `fileuploads` WHERE `id` = ?', [id]);
    const [rows, fields] = await db.execute(`
      SELECT 
        fu.*, 
        l.last_access as last_access, 
        u.id as user_id, 
        u.email as user_email 
      FROM fileuploads as fu 
      LEFT JOIN logs as l 
        ON fu.id = l.file_id 
      LEFT JOIN users as u 
        ON u.id = l.user_id 
      WHERE fu.id=?`, [id]);
    return {
        rows,
        // fields
    };
};
exports.getById = getById;
const deleteById = async (id) => {
    let db = await obj.connect();
    const [rows, fields] = await db.execute('DELETE FROM `fileuploads` WHERE `id` = ?', [id]);
    return {
        rows,
        // fields
    };
};
exports.deleteById = deleteById;
const getFiles = async () => {
    try {
        const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
        const fs = require('fs');
        const files = await fs.promises.readdir(FILE_UPLOAD_PATH);
        return files;
    }
    catch (ex) {
        throw ex;
    }
};
exports.getFiles = getFiles;
