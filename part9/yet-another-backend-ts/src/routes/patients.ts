import express, { Request } from 'express';
import {
 // addPatient,
  getSecurePatient,
  findById,
} from '../services/patientService';
//import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getSecurePatient());
});

router.get('/:id', (req: Request, res) => {
  try {
    res.send(findById(req.params.id));
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send({ error: e.message });
    }
  }
});

/* router.post('/', (req, res) => {
  try {
    const newPatientRecord = toNewPatient(req.body);
    const addedRecord = addPatient(newPatientRecord);
    res.json(addedRecord);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
}); */
export default router;