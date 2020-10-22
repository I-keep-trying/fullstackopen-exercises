import express from 'express';
import { calculateBmi } from './bmi';
const app = express();

app.get('/bmi', (req, res) => {
  const { height, mass } = req.query;
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.mass))) {
    const bmi = calculateBmi({
      height: Number(height),
      mass: Number(mass),
    });
    return res.json({ height, mass, bmi });
  } else {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
