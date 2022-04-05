import { Router, Request } from "express";
import { fileReader, listFileRecords, deleteFile, listFiles, getFileById } from "../controllers/jetDevs";
import { verifyToken, HasRole } from "../controllers/auths";

import { config } from "dotenv";
config();

import path from "path";
import multer from "multer";

const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
const USER = process.env.USER;
const ADMIN = process.env.ADMIN;

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
        cb(null, FILE_UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    
    let id = req.params.filename;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName+'-'+ Date.now() +'-'+ Math.random() + extention;
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

router.get('/list', [verifyToken, HasRole([USER!, ADMIN!])], listFileRecords);
router.get('/list-files', [verifyToken, HasRole([USER!, ADMIN!])], listFiles);
router.post('/:filename', [verifyToken, HasRole([ADMIN!])], upload.single('uploaded_file'), fileReader);
router.delete('/:id', [verifyToken, HasRole([ADMIN!])], deleteFile);
router.get('/:id', [verifyToken, HasRole([USER!, ADMIN!])], getFileById);

export default router;