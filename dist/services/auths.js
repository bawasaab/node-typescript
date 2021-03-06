"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokens = exports.jwtSign = exports.userlogIn = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connection_1 = __importDefault(require("../db/connection"));
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
let obj = new connection_1.default();
const userlogIn = async (data) => {
    try {
        let db = await obj.connect();
        const [rows, fields] = await db.execute("SELECT * FROM `users` where email=?", [data.email]);
        return {
            rows,
            // fields
        };
    }
    catch (ex) {
        throw ex;
    }
};
exports.userlogIn = userlogIn;
function createToken(user) {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.sign)({ user }, JWT_SECRET, { expiresIn: 60 * 60 }, async (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}
function verifyTokenn(token) {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
const jwtSign = async (user) => {
    try {
        let result = await createToken(user);
        return result;
    }
    catch (ex) {
        throw ex;
    }
};
exports.jwtSign = jwtSign;
const verifyTokens = async (token) => {
    try {
        let result = await verifyTokenn(token);
        return result;
    }
    catch (ex) {
        throw ex;
    }
};
exports.verifyTokens = verifyTokens;
