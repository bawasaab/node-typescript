import { RequestHandler } from "express";
import { User } from "../models/users";
import { userlogIn, jwtSign } from "../services/auths";

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