import express from 'express';
import { addEntry, addPatient, getPatientById, getPatients } from '../services/patientService';
import { toNewPatient } from '../utils/toNewPatient';


const router = express.Router();

router.get('/', (_req, res) => {
    void getPatients().then(patients => {
        return res.json(patients);
    });
     
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    void addPatient(newPatient).then (addedPatient => {
        
            console.log(addedPatient);
            return res.json(addedPatient);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
   void getPatientById(id).then(patient => {
        if(patient) {
            return res.json(patient);
        } else {
            return res.status(400).send('invalid params');
        }
    });
});

router.post('/entry/:id', (req, res) => {
    void addEntry(req.body, req.params.id).then (
        entry => {
            if(entry) {
                res.json(entry);
            } else {
                res.status(400).send('invalid entry data');
            }
        }
    );


});

export default router;

