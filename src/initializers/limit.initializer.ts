import express, { Application } from 'express'
import Initializer from './initializer';

const LimitInitializer: Initializer = new Initializer(
  (app: Application) => {
    app.use(express.json({ limit: '5mb' }));
    return app;
  }
);

export default LimitInitializer;