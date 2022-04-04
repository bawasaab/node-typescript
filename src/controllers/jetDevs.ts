import { RequestHandler } from "express";
import * as reader from "xlsx";
import { insert } from "../services/jetdevs";

import { config } from "dotenv";
import { Jetdevs } from "../models/jetdevs";
config();

const fileUploadPath = process.env.PWD;

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
            // data: JSON.stringify(data),
            data: 'test',
            filepath: fileUploadPath +'/dist/uploads/' + '/test.xlsx'
        };
        insert(in_data, (results:any, fields: any) => {
            res.status(201).json({
                message: 'file data',
                createTodo: data,
                result: {
                    results,
                    fields
                }
            });
        });

        // res.status(201).json({
        //     message: 'file data',
        //     createTodo: data,
        //     result: result
        // });
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
