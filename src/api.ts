import { Server } from 'http';
import express, { Application } from 'express';
import figlet from 'figlet';
import ApiRouter from './api/index';
import {
  StaticInitializer, 
  CoverageInitializer, 
  LimitInitializer, 
  RedirectsInitializer, 
  ErrorInitializer,
  RunInitializer
} from './initializers/index';

const apiName = process.env.API_NAME || 'Winkapi';
console.log(`\n${figlet.textSync(apiName, 'Doom')}\n`);

let app: Application = express().use('/api', ApiRouter);
app = LimitInitializer(app);
app = StaticInitializer(app);
app = CoverageInitializer(app);
app = RedirectsInitializer(app);
app = ErrorInitializer(app);
app = RunInitializer(app);

export const Api = app;
