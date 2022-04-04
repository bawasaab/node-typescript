import { RequestHandler } from "express";
import * as reader from "xlsx";
import { insert, insertTest } from "../services/jetdevs";

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

        const file = reader.readFile(FILE_UPLOAD_PATH + '/deepak.xlsx');

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
            filepath: FILE_UPLOAD_PATH + 'abc.xlsx'
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

export const uploadFile: RequestHandler = (req, res, next) => {
    res.status(200).json({
        message: 'file uploaded',
        params: req.params
    });
}


