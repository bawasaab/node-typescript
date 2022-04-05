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

export const getFileRecords = async() => {

  try { 

    let db = await obj.connect();
    const [rows, fields] = await db.execute('SELECT * FROM `fileuploads`', []);
    return {
      rows,
      // fields
    };
  } catch(ex) {
    throw ex;
  }
}

export const getById = async(id: Number) => {
  let db = await obj.connect();
    // const [rows, fields] = await db.execute('SELECT * FROM `fileuploads` WHERE `id` = ?', [id]);
    const [rows, fields] = await db.execute(`
      SELECT 
        fu.*, 
        l.last_access as last_access, 
        u.id as user_id, 
        u.email as user_email 
      FROM fileuploads as fu 
      LEFT JOIN logs as l 
        ON fu.id = l.file_id 
      LEFT JOIN users as u 
        ON u.id = l.user_id 
      WHERE fu.id=?`, 
      [id]);
    return {
      rows,
      // fields
    };
}

export const deleteById = async(id: Number) => {
  let db = await obj.connect();
    const [rows, fields] = await db.execute('DELETE FROM `fileuploads` WHERE `id` = ?', [id]);
    return {
      rows,
      // fields
    };
}

export const getFiles = async () => {
  try {

    const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
    const fs = require('fs');
    const files = await fs.promises.readdir( FILE_UPLOAD_PATH );
    return files;
  } catch(ex) {
    throw ex;
  }
}