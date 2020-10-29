import express from 'express';
import diagnosesData from '../../data/diagnoses.json';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesData);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis record!');
});

export default router;
