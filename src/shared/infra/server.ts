import 'reflect-metadata';
import express, { Request, NextFunction, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '@errors/AppError';

import swaggerConfig from '../../swagger.json';
import '@shared/infra/typeorm';
import '@shared/container';
import { router } from './http/routes';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
