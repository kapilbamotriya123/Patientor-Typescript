"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const toNewPatient_1 = require("../utils/toNewPatient");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    void (0, patientService_1.getPatients)().then(patients => {
        return res.json(patients);
    });
});
router.post('/', (req, res) => {
    const newPatient = (0, toNewPatient_1.toNewPatient)(req.body);
    void (0, patientService_1.addPatient)(newPatient).then(addedPatient => {
        console.log(addedPatient);
        return res.json(addedPatient);
    });
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    void (0, patientService_1.getPatientById)(id).then(patient => {
        if (patient) {
            return res.json(patient);
        }
        else {
            return res.status(400).send('invalid params');
        }
    });
});
router.post('/entry/:id', (req, res) => {
    void (0, patientService_1.addEntry)(req.body, req.params.id).then(entry => {
        if (entry) {
            res.json(entry);
        }
        else {
            res.status(400).send('invalid entry data');
        }
    });
});
exports.default = router;
