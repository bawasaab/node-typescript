import { config } from "dotenv";
config();
import Connection from "../db/connection";
import { User } from "../models/users";
import { sign, TokenExpiredError, Secret, JsonWebTokenError, Jwt, JwtHeader, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
let obj = new Connection();

export const userlogIn = async ( data: User ) => {
  try {

    let db = await obj.connect();
    console.log('data', data);
    console.log('data.email', data.email);
    const [rows, fields] = await db.execute("SELECT * FROM `users` where email=?", [data.email]);
    console.log('rows', rows);
    return {
      rows,
      // fields
    };
  } catch(ex) {
    throw ex;
  }
}

function myPromise( user: User ) {
    return new Promise((resolve, reject) => {
        sign( {user}, JWT_SECRET!, { expiresIn: 60*60 }, async (err, token) => {
            if( err ) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

export const jwtSign = async (user: User) => {
    try {

        let result = await myPromise(user);
        return result;
    } catch(ex) {
        throw ex;
    }
}