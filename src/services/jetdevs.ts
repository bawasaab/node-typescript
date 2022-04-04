import Connection from "../db/connection";
import { Jetdevs } from "../models/jetdevs";

let obj = new Connection();

export const getTest = async (data: Jetdevs) => {
  try {

    let obj = new Connection();
    let db = await obj.connect();
    const [rows, fields] = await db.execute('SELECT * FROM `fileuploads` WHERE `id` = ?', [1]);
    return {
      rows,
      // fields
    };
  } catch(ex) {
    throw ex;
  }
}

export const insertTest = async (data: Jetdevs) => {
  try {

    let obj = new Connection();
    let db = await obj.connect();
    const [rows] = await db.execute('INSERT INTO fileuploads SET data=?, filepath=?', [data.data, data.filepath]);
    return {
      rows
    };
  } catch(ex) {
    throw ex;
  }
}

export const insert = async (data: Jetdevs) => {

    try {

      let db = await obj.connect();
      const [rows] = await db.execute('INSERT INTO fileuploads SET data=?, filepath=?', [data.data, data.filepath]);
      return {
        rows
      };
    } catch(ex) {
      throw ex;
    }
}