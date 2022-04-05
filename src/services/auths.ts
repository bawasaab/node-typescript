import { config } from "dotenv";
config();
import Connection from "../db/connection";
import { User } from "../models/users";
import { sign, verify, TokenExpiredError, Secret, JsonWebTokenError, Jwt, JwtHeader, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
let obj = new Connection();

export const userlogIn = async ( data: User ) => {
  try {

    let db = await obj.connect();
    const [rows, fields] = await db.execute("SELECT * FROM `users` where email=?", [data.email]);
    return {
      rows,
      // fields
    };
  } catch(ex) {
    throw ex;
  }
}

function createToken( user: User ) {
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

function verifyTokenn( token: string ) {
    return new Promise((resolve, reject) => {
        verify( token, JWT_SECRET!, async (err, decoded) => {
            if( err ) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export const jwtSign = async (user: User) => {
    try {

        let result = await createToken(user);
        return result;
    } catch(ex) {
        throw ex;
    }
}

export const verifyTokens = async (token: string) => {
    try {

        let result = await verifyTokenn(token);
        return result;
    } catch(ex) {
        throw ex;
    }
}