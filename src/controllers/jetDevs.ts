import { RequestHandler } from "express";
import * as reader from "xlsx";
import { insert, insertTest } from "../services/jetdevs";

import { config } from "dotenv";
import { Jetdevs } from "../models/jetdevs";
config();

const fileUploadPath = process.env.PWD;

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

export const fileReader: RequestHandler = (req, res, next) => {

    try {

        const file = reader.readFile(fileUploadPath +'/dist/uploads/' + '/test.xlsx');

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
            filepath: fileUploadPath +'/dist/uploads/' + '/test.xlsx'
        };
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


