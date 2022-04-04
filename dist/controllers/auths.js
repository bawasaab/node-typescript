"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const users_1 = require("../models/users");
const auths_1 = require("../services/auths");
const logIn = async (req, res, next) => {
    try {
        let body = req.body;
        const user = new users_1.User(body.email, body.password);
        let data = await (0, auths_1.userlogIn)(user);
        let result = data.rows[0];
        res.status(201).json({
            message: 'Login successfull',
            result,
            token: await (0, auths_1.jwtSign)(result)
        });
    }
    catch (ex) {
        throw ex;
    }
};
exports.logIn = logIn;
