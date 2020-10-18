import { Router, Request } from 'express';
import { Response } from 'express-serve-static-core';

type Payload = {
  hello: 'world'
}

export const routes = Router();

routes.get('/', (req: Request, res: Response<Payload>) => {
  res.send({
    hello: 'world',
  });
});

