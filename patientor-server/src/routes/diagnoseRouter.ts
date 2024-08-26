import express from 'express';
import { getDiagnoseEntries } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    void getDiagnoseEntries().then(diag => {
        return res.json(diag);
    });
});

export default router;

