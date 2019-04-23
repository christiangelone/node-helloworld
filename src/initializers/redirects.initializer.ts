import express, { Request, Response, Application } from 'express'
import Initializer from './initializer';

const RedirectsInitializer: Initializer = new Initializer(
  (app: Application) => {
    app.get('/', (req: Request, res: Response) => res.redirect('/api'));
    return app;
  }
);

export default RedirectsInitializer;