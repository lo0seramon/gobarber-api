import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from '../../../config/upload';

import '../typeorm';
import AppError from '../../errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);

  return res.status(500).json({
    satus: 'error',
    message: 'Internal server error.'
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
