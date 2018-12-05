import express, { Application } from 'express'

const LimitInitializer: (app: Application) => Application = 
(app: Application) => {
  app.use(express.json({ limit: '5mb' }));
  return app;
};

export default LimitInitializer;