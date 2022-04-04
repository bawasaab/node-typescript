"use strict";
// import mysql from "mysql2";
Object.defineProperty(exports, "__esModule", { value: true });
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jetdevs'
// });
async function connection() {
    try {
        // get the client
        const mysql = require('mysql2/promise');
        // get the promise implementation, we will use bluebird
        const bluebird = require('bluebird');
        // create the connection
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jetdevs',
            Promise: bluebird
        });
        return connection;
    }
    catch (ex) {
        throw ex;
    }
}
exports.default = (async () => await connection())();
// export default connection().then().catch((ex) => console.log('exception', ex));
