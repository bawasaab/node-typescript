"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = exports.deleteFile = exports.getFileById = exports.listFileRecords = exports.fileReader = exports.insertTestC = void 0;
const moment_1 = __importDefault(require("moment"));
const reader = __importStar(require("xlsx"));
const jetdevs_1 = require("../services/jetdevs");
const logs_1 = require("../services/logs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
const insertTestC = async (req, res, next) => {
    let in_data = {
        data: 'data',
        filepath: 'filepath'
    };
    let result = await (0, jetdevs_1.insertTest)(in_data);
    res.status(201).send({
        msg: 'Created Successfully',
        result
    });
};
exports.insertTestC = insertTestC;
const fileReader = async (req, res, next) => {
    try {
        let fileName = req.params.imageDetails.fullFileNameWithPath;
        const file = reader.readFile(fileName);
        let data = [];
        const sheets = file.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
            temp.forEach((res) => {
                data.push(res);
            });
        }
        let in_data = {
            data: JSON.stringify(data),
            filepath: fileName
        };
        let result = await (0, jetdevs_1.insert)(in_data);
        res.status(201).send({
            in_data,
            result
        });
    }
    catch (ex) {
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.fileReader = fileReader;
const listFileRecords = async (req, res, next) => {
    try {
        let result = await (0, jetdevs_1.getFileRecords)();
        res.status(200).send({
            result
        });
    }
    catch (ex) {
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.listFileRecords = listFileRecords;
const getFileById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await (0, jetdevs_1.getById)(id);
        if (result && result.rows.length) {
            let row = result.rows[0];
            let currentUser = req.authData.user;
            let user_id = currentUser['id'];
            let log = {
                file_id: id,
                user_id: user_id,
                last_access: (0, moment_1.default)().format('YYYY-MM-DD h:mm:ss').toString()
            };
            let logData = await (0, logs_1.insertLogs)(log);
            res.status(200).send({
                msg: 'Record found',
                data: {
                    row,
                    logData
                }
            });
        }
        else {
            res.status(200).send({
                msg: 'No record found',
            });
        }
    }
    catch (ex) {
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.getFileById = getFileById;
const deleteFile = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await (0, jetdevs_1.getById)(id);
        if (result && result.rows.length) {
            let row = result.rows[0];
            const fs = require('fs');
            let filePath = row.filepath;
            fs.unlinkSync(filePath);
            let isDeleted = await (0, jetdevs_1.deleteById)(id);
            res.status(200).send({
                isDeleted
            });
        }
        else {
            res.status(200).send({
                msg: 'No record found',
            });
        }
    }
    catch (ex) {
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.deleteFile = deleteFile;
const listFiles = async (req, res, next) => {
    try {
        let files = await (0, jetdevs_1.getFiles)();
        res.status(200).send({
            files
        });
    }
    catch (ex) {
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.listFiles = listFiles;
