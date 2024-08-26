import express from 'express';
// import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoseRouter';
import patientsRouter from './src/routes/patientRouter';
import { connectToDatabase } from './src/db/mongoose';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
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



app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

const PORT = 3001;

void connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
});