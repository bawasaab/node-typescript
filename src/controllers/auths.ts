import { RequestHandler } from "express";
import { User } from "../models/users";
import { userlogIn, jwtSign, verifyTokens } from "../services/auths";

export const logIn: RequestHandler = async (req, res, next) => {
    try {
        let body = (req.body as User);
        const user: User = new User(
            body.email,
            body.password
        );
        let data: any = await userlogIn(user);
        let result: User = data.rows[0];
        res.status(201).json({
            message: 'Login successfull',
            result,
            token: await jwtSign(result)
        });
    } catch( ex ) {
        throw ex;
    }
}

export const verifyToken: RequestHandler = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {

            const bearer = bearerHeader.split(' ');

            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            (req as unknown as {token: string}).token = bearerToken;

            let result = await verifyTokens(bearerToken);
            (req as unknown as {authData: any}).authData = result;
            next();
        } else{
            // throw 'Header is not defined.';
            res.status(500).send({
                msg: 'Header is not defined.'
            }); 
        }
    } catch(ex: any) {
        // throw ex;
        res.status(500).send({
            msg: ex.toString(),
        });
    }
}

export const decodeToken: RequestHandler = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {

            const bearer = bearerHeader.split(' ');

            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            (req as unknown as {token: string}).token = bearerToken;

            let result = await verifyTokens(bearerToken);
            (req as unknown as {authData: any}).authData = result;
            res.status(200).send(result);
        } else{
            // throw 'Header is not defined.';
            res.status(500).send({
                msg: 'Header is not defined.'
            }); 
        }
    } catch(ex: any) {
        // throw ex;
        res.status(500).send({
            msg: ex.toString(),
        });
    }
}
