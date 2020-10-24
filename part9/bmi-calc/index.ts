import express from 'express';
import { calculateBmi } from './bmi';
import { exerciseCalc } from './exercise';
const app = express();
app.use(express.json());

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

interface InputTypes {
  target: number;
  entries: number[];
}

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: InputTypes = request.body;
  console.log('body ', body);
  const target = Number(body.target);
  if (isNaN(target)) {
    throw new Error('target must be a number');
  }
  const entries = body.entries.map((entry) => {
    if (isNaN(Number(entry))) {
      throw new Error('entries must all be numbers');
    }
    return entry;
  });

  const calc = exerciseCalc(target, entries);
  response.send(calc);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
