"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const diagnoseRouter_1 = __importDefault(require("./src/routes/diagnoseRouter"));
const patientRouter_1 = __importDefault(require("./src/routes/patientRouter"));
const mongoose_1 = require("./src/db/mongoose");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
app.get('/test', (_req, res) => {
    res.send('Hello Full stack Open');
});
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnoseRouter_1.default);
app.use('/api/patients', patientRouter_1.default);
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
const PORT = 3001;
void (0, mongoose_1.connectToDatabase)().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
});
