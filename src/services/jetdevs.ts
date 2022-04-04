import connection from "../db/connection";
import { Jetdevs } from "../models/jetdevs";

export const insert = (data: Jetdevs, cb: Function) => {
    
    connection.execute(
        'INSERT INTO fileuploads(filepath, data) VALUES ?, ?',
        [data.filepath, data.data],
        function(err, results, fields) {
          console.log('results', results);
          console.log('fields', fields);
          cb(results, fields)
        }
    );

    // try {

    //     const result = await connection.execute('INSERT INTO fileuploads(filepath, data) VALUES ?, ?', [data.filepath, data.data]);
    //     console.log('result', result);
    //     return result;
    // } catch(ex) {
    //     throw ex;
    // }
}