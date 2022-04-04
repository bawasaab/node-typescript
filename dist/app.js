"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const todos_1 = __importDefault(require("./routes/todos"));
const jetDevs_1 = __importDefault(require("./routes/jetDevs"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, '/uploads')));
app.use('/todos', todos_1.default);
app.use('/jetdevs', jetDevs_1.default);
app.use('/users', users_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({
        msg: err.message
    });
});
app.listen(3000);
