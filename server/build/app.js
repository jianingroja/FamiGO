"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router_1 = __importDefault(require("./router"));
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
app.use(router_1.default);
app.get('/ping', (_req, res) => {
    console.log('aaa');
    res.send('pong');
});
exports.default = app;
