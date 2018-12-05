const dashboard = require('appmetrics-dash');
import express, { Request, Response, Application } from 'express'
import { Server } from 'http';

const runned: Function = () => {
  console.log(`\n[${process.pid}]: 🚀  ${process.env.API_NAME} running on port ${port}...`)
  console.log(` => Press \`Ctrl + c\` to stop ${process.env.API_NAME}`);
  console.log(`--------------------------------------------------------------------------`);
}

const stopped: Function = () => {
  console.log(`\n[${process.pid}]: 💢  ${process.env.API_NAME} has stopped running`)
}

const port: Number = parseInt(<any> process.env.API_PORT) || 3000;

const RunInitializer: (app: Application) => Application = 
(app: Application) => {
  if (process.env.NODE_ENV !== 'testing') {
    const server: Server = app.listen(port, runned)
    dashboard.monitor({ server, title: 'API Metrics' });
    process.on('SIGINT', () => {
      stopped();
      process.exit(0);
    });
  }
  return app;
}

export default RunInitializer;
