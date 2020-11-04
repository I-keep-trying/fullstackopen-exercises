import express, { Request } from 'express';
import {
  getNonSensitivePatients,
  addPatient,
  getPatientByID,
} from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = addPatient(newPatient);
    res.send(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get('/:id', (req: Request, res) => {
  res.send(getPatientByID(req.params.id));
});

export default router;
