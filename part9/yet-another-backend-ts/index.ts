import express from 'express';
import cors from 'cors';

import patientsRouter from './src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3011;

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//answers
//https://github.com/djl218/TypeScript2