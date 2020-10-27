import express from 'express';
import { calculateBmi } from './bmi';
import { exerciseCalc } from './exercise';

const app = express();
app.use(express.json());

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});

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
  try {
    const input = request.body as InputTypes;
    const { target, entries } = input;
    if (typeof target === 'undefined') {
      throw new Error('Target parameter was not received');
    }
    if (typeof target !== 'number') {
      throw new Error('Target must be a number');
    }
    if (typeof entries === 'undefined') {
      throw new Error('Entries parameter missing');
    }
    entries.map((entry) => {
      if (typeof entry !== 'number') {
        throw new Error('Entries must all be numbers');
      }
      return entry;
    });
    const calc = exerciseCalc(target, entries);
    response.send(calc);
  } catch (e) {
    if (e instanceof Error) {
      console.log('instance of e', e.message);
      response.send(e.message);
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
