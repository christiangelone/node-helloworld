import express, { Application, ErrorRequestHandler, Request, Response, Router, NextFunction } from 'express';
import ApiRouter from './api/index';
import NotImplementedError from './lib/common/errors/not_implemented';

const app: Application = express();
app.use('/static', express.static('public'))
app.use(express.json());
app.use('/api', ApiRouter);

app.get('/', (req: Request, res: Response) => res.redirect('/api'));
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(NotImplementedError(req));
});
app.use((apiError: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(apiError.statusCode).send(apiError.error);
});

const port: Number = parseInt(<any> process.env.PORT) || 3000;

const runned: Function = () => {
  console.log(`\n[${process.pid}]: 🚀  ${process.env.API_NAME} running on port ${port}...`)
  console.log(` => Press \`Ctrl + c\` to stop ${process.env.API_NAME}`);
  console.log(`--------------------------------------------------------------------------`);
}

const stopped: Function = () => {
  console.log(`\n[${process.pid}]: 💢  ${process.env.API_NAME} has stopped running`)
}

if (process.env.NODE_ENV !== 'testing') {
  app.listen(port, runned())
  process.on('SIGINT', () => {
    stopped();
    process.exit(0);
  });
}

export const Api: Application = app;