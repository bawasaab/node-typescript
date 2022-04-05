"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRole = exports.decodeToken = exports.verifyToken = exports.logIn = void 0;
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
        // throw ex;
        res.status(500).json({
            msg: ex.toString(),
        });
    }
};
exports.logIn = logIn;
const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            req.token = bearerToken;
            let result = await (0, auths_1.verifyTokens)(bearerToken);
            req.authData = result;
            next();
        }
        else {
            // throw 'Header is not defined.';
            res.status(500).send({
                msg: 'Header is not defined.'
            });
        }
    }
    catch (ex) {
        // throw ex;
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.verifyToken = verifyToken;
const decodeToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            req.token = bearerToken;
            let result = await (0, auths_1.verifyTokens)(bearerToken);
            req.authData = result;
            res.status(200).send(result);
        }
        else {
            // throw 'Header is not defined.';
            res.status(500).send({
                msg: 'Header is not defined.'
            });
        }
    }
    catch (ex) {
        // throw ex;
        res.status(500).send({
            msg: ex.toString(),
        });
    }
};
exports.decodeToken = decodeToken;
const HasRole = (role) => {
    return function (req, res, next) {
        // if (role !== (req as unknown as {authData: any}).authData.user.role) {
        //   res.status(401).send({
        //     message: "Access Denied!"
        //   });
        // } else {
        //     next();
        // }
        let currentUser = req.authData.user;
        let currentUserRole = currentUser['role'];
        if (!role.includes(currentUserRole)) {
            res.status(401).send({
                message: "Access Denied!"
            });
        }
        else {
            next();
        }
    };
};
exports.HasRole = HasRole;
