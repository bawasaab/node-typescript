import Connection from "../db/connection";
import { Logs } from "../models/logs";

let obj = new Connection();

export const insertLogs = async (data: Logs) => {
  try {

    let db = await obj.connect();

    let result = await isLogExitsByFileId(data.file_id);
    if( result && result.rows.length ) {

        const [rows] = await db.execute('UPDATE logs SET user_id=?, file_id=?, last_access=? WHERE file_id=?', [data.user_id, data.file_id, data.last_access, data.file_id]);
        return {
            rows
          };
    } else {

        const [rows] = await db.execute('INSERT INTO logs SET user_id=?, file_id=?, last_access=?', [data.user_id, data.file_id, data.last_access]);
        return {
          rows
        };
    }
  } catch(ex) {
    throw ex;
  }
}

export const isLogExitsByFileId = async (id: Number) => {
    try {

        let db = await obj.connect();
        const [rows] = await db.execute('SELECT * FROM `logs` WHERE `file_id` = ?', [id]);
        return {
            rows
        };
    } catch(ex) {
        throw ex;
    }
}