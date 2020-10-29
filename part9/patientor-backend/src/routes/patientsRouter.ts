/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientRecord from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSecurePatientRecord());
});

router.get('/:id', (req, res) => {
  const record = patientService.findById(req.params.id);

  if (record) {
    res.send(record);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientRecord = toNewPatientRecord(req.body);

    const addedRecord = patientService.addEntry(newPatientRecord);
    res.json(addedRecord);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
