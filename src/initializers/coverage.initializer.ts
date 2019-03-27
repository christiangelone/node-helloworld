import express, { Application } from 'express'
import Initializer from './initializer';

const CoverageInitializer: Initializer = new Initializer(
  (app: Application) => {
    if (process.env.NODE_ENV === 'development') 
      app.use('/api/coverage', express.static('coverage'));
    return app;
  }
);

export default CoverageInitializer;