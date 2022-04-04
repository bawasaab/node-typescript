import { Router, Request } from "express";
import { fileReader, uploadFile, insertTestC } from "../controllers/jetDevs";

import { config } from "dotenv";
config();

import path from "path";
import multer from "multer";

// const fileUploadPwd = process.env.PWD;
const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
console.log('FILE_UPLOAD_PATH', FILE_UPLOAD_PATH);

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
        cb(null, FILE_UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    
    let id = req.params.id;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName + extention;
    // let fullFileNameWithPath = fileUploadPwd! + FILE_UPLOAD_PATH + fullFileName;
    let fullFileNameWithPath = FILE_UPLOAD_PATH + fullFileName;
    (req.params as {imageDetails: any}).imageDetails = {
      fileOriginalname : originalname,
      newFileName : newFileName,
      fileExtention : extention,
      fullFileName : fullFileName,
      fullFileNameWithPath : fullFileNameWithPath
    };
    cb(null , fullFileName );
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000} // (1000000 bytes = 1MB)
});

const router = Router();

router.post('/', fileReader);

router.post('/upload/:id', upload.single('profile_pic'), uploadFile);

router.post('/test', insertTestC);

export default router;