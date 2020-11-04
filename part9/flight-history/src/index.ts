import express from 'express';
import diaryRouter from './routes/diariesRouter';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (err.name === 'SyntaxError') {
      return res.status(500).send('Malformatted request').end();
    } else {
      res.status(500).send(err.message);
    }
    next(err);
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
