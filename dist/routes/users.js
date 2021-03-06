"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/:id', users_1.getUserById);
router.patch('/:id', users_1.updateUser);
router.delete('/:id', users_1.deleteUser);
router.get('/', users_1.getAllUser);
router.post('/', users_1.insertUser);
exports.default = router;
