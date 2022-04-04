"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auths_1 = require("../controllers/auths");
const router = (0, express_1.Router)();
router.post('/login', auths_1.logIn);
exports.default = router;
