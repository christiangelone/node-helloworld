import express, { Application } from 'express'
import Initializer from './initializer';

const StaticInitializer: Initializer = new Initializer(
  (app: Application) => {
    app.use('/static', express.static('public'));
    return app;
  }
);

export default StaticInitializer;