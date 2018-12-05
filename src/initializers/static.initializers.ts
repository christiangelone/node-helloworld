import express, { Application } from 'express'

const StaticInitializer: (app: Application) => Application = 
(app: Application) => {
  app.use('/static', express.static('public'));
  return app;
};

export default StaticInitializer;