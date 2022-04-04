import Connection from "../db/connection";
import { User } from "../models/users";

let obj = new Connection();

export const getAllUsers = async () => {
  try {

    let db = await obj.connect();
    const [rows, fields] = await db.execute('SELECT * FROM `users`', []);
    return {
      rows,
      // fields
    };
  } catch(ex) {
    throw ex;
  }
}

export const getUsersById = async(id: Number) => {
    let db = await obj.connect();
      const [rows, fields] = await db.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
      return {
        rows,
        // fields
    };
}

export const insertUsers = async (data: User) => {
  try {

    let db = await obj.connect();
    const [rows] = await db.execute('INSERT INTO users SET email=?, password=?, role=?', [data.email, data.password, data.role]);
    return {
      rows
    };
  } catch(ex) {
    throw ex;
  }
}

export const updateUsers = async (data: User, id: Number) => {
    try {
  
      let db = await obj.connect();
      const [rows] = await db.execute('UPDATE users SET email=?, password=?, role=?', [data.email, data.password, data.role]);
      return {
        rows
      };
    } catch(ex) {
      throw ex;
    }
}

export const deleteUsersById = async(id: Number) => {
  let db = await obj.connect();
    const [rows, fields] = await db.execute('DELETE FROM `users` WHERE `id` = ?', [id]);
    return {
      rows,
      // fields
    };
}