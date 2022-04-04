"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jetDevs_1 = require("../controllers/jetDevs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FILE_UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        let id = req.params.filename;
        let originalname = file.originalname;
        let newFileName = id;
        let extention = path_1.default.extname(originalname);
        let fullFileName = newFileName + '-' + Date.now() + '-' + Math.random() + extention;
        let fullFileNameWithPath = FILE_UPLOAD_PATH + fullFileName;
        req.params.imageDetails = {
            fileOriginalname: originalname,
            newFileName: newFileName,
            fileExtention: extention,
            fullFileName: fullFileName,
            fullFileNameWithPath: fullFileNameWithPath
        };
        cb(null, fullFileName);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 } // (1000000 bytes = 1MB)
});
const router = (0, express_1.Router)();
router.get('/list', jetDevs_1.listFiles);
router.post('/:filename', upload.single('uploaded_file'), jetDevs_1.fileReader);
router.delete('/:id', jetDevs_1.deleteFile);
exports.default = router;
