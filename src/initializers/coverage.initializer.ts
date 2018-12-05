import express, { Application } from 'express'

const CoverageInitializer: (app: Application) => Application = 
(app: Application) => {
  if (process.env.NODE_ENV === 'development') 
    app.use('/api/coverage', express.static('coverage'));
  return app;
};

export default CoverageInitializer;