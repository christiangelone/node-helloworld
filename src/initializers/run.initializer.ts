const dashboard = require('appmetrics-dash');
import express, { Request, Response, Application } from 'express'
import fs from 'fs'
import path from 'path'
import http, { Server } from 'http';
import https from 'https';
import Initializer from './initializer';

const runned: Function = () => {
  console.log(`\n[${process.pid}]: 🚀  (${process.env.API_PROTOCOL}) ${process.env.API_NAME} running on port ${port}...`)
  console.log(` => Press \`Ctrl + c\` to stop ${process.env.API_NAME}`);
  console.log(`--------------------------------------------------------------------------`);
}

const stopped: Function = () => {
  console.log(`\n[${process.pid}]: 💢  ${process.env.API_NAME} has stopped running`)
}

const createServer = (app: Application, protocol: string) => {
  return ({
    https: https.createServer({
      key: fs.readFileSync(path.resolve(`certificates/${process.env.HTTPS_KEY}`)),
      cert: fs.readFileSync(path.resolve(`certificates/${process.env.HTTPS_CERTIFICATE}`))
    }, app),
    http: http.createServer(app)
  })[protocol]
}

const port: Number = parseInt(<any> process.env.API_PORT) || 3000;

const RunInitializer: Initializer = new Initializer(
  (app: Application) => {
    if (process.env.NODE_ENV !== 'testing') {
      const protocol = process.env.API_PROTOCOL || 'http';
      const server: Server = createServer(app, protocol).listen(port, runned())
      dashboard.monitor({ server, title: 'API Metrics' });
      process.on('SIGINT', () => {
        stopped();
        process.exit(0);
      });
    }
    return app;
  }
);

export default RunInitializer;
