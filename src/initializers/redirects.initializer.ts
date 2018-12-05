import express, { Request, Response, Application } from 'express'

const RedirectsInitializer: (app: Application) => Application = 
(app: Application) => {
  app.get('/', (req: Request, res: Response) => res.redirect('/api'));
  return app;
};

export default RedirectsInitializer;