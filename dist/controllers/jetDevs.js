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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.fileReader = exports.insertTestC = void 0;
const reader = __importStar(require("xlsx"));
const jetdevs_1 = require("../services/jetdevs");
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
        const file = reader.readFile(FILE_UPLOAD_PATH + '/abc.xlsx');
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
            filepath: FILE_UPLOAD_PATH + 'abc.xlsx'
        };
        let result = await (0, jetdevs_1.insert)(in_data);
        res.status(201).send({
            in_data,
            result
        });
    }
    catch (ex) {
        throw ex;
    }
};
exports.fileReader = fileReader;
const uploadFile = (req, res, next) => {
    res.status(200).json({
        message: 'file uploaded',
        params: req.params
    });
};
exports.uploadFile = uploadFile;
