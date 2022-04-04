import { RequestHandler } from "express";
import * as reader from "xlsx";
import { insert, insertTest, getFiles, getFileRecords, getById, deleteById } from "../services/jetdevs";

import { config } from "dotenv";
import { Jetdevs } from "../models/jetdevs";
config();

const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;

export const insertTestC: RequestHandler = async (req, res, next) => {
    let in_data: Jetdevs = {
        data: 'data',
        filepath: 'filepath'
    };
    let result = await insertTest(in_data);
    res.status(201).send({
        msg: 'Created Successfully',
        result
    });
}

export const fileReader: RequestHandler = async (req, res, next) => {

    try {

        // const file = reader.readFile(FILE_UPLOAD_PATH + '/deepak.xlsx');
        let fileName = (req.params.imageDetails as unknown as {fullFileNameWithPath: string}).fullFileNameWithPath;
        console.log('fileName', fileName);
        const file = reader.readFile(fileName);

        let data: any = []
        
        const sheets = file.SheetNames
        
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        
            temp.forEach((res: any) => {
                data.push(res)
            })
        }

        let in_data: Jetdevs = {
            data: JSON.stringify(data),
            filepath: fileName
        };

        let result = await insert(in_data);
        res.status(201).send({
            in_data,
            result
        });
    } catch(ex) {
        throw ex;
    }    
}

export const listFileRecords:  RequestHandler = async (req, res, next) => {
    try {

        let result = await getFileRecords();
        res.status(200).send({
            result
        });
    } catch(ex) {
        throw ex;
    }
}

export const deleteFile: RequestHandler = async (req, res, next) => {

    try {

        let id = (req.params as unknown as {id: Number}).id;
        let result = await getById(id);
        if( result && result.rows.length ) {
            let row = result.rows[0];
            
            const fs = require('fs');
            let filePath = row.filepath;
            fs.unlinkSync(filePath);

            let isDeleted = await deleteById(id);

            res.status(200).send({
                isDeleted
            });
        }
    } catch(ex) {
        throw ex;
    }
}

export const listFiles: RequestHandler = async (req, res, next) => {
    try {

        let files = await getFiles();
        res.status(200).send({
           files
        });
    } catch(ex) {
        throw ex;
    }
}