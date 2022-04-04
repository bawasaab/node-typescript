const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

class Connection {

    constructor() {
        this.connect();
    }

    public async connect() {
        // create the connection
        let db = await mysql.createConnection({
            host:'localhost', 
            user: 'root', 
            database: 'jetdevs',
            Promise: bluebird
        });
        return db;
    }
}

export default Connection;