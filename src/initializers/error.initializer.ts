import express, { Request, Response, NextFunction, Application } from 'express'
import { NotImplementedError } from '../lib/common/errors';
import Initializer from './initializer';

const ErrorInitializer: Initializer = new Initializer(
  (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => 
      next(NotImplementedError(req)));
    app.use((apiError: any, req: Request, res: Response, next: NextFunction) => 
      res.status(apiError.statusCode).send(apiError.error));
    return app;
  }
);

export default ErrorInitializer;

