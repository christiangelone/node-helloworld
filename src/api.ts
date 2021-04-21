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
import Initializer from './initializers/initializer';

const apiName = process.env.API_NAME || 'API';
if(process.env.NODE_ENV !== "testing")
  console.log(`\n${figlet.textSync(apiName, 'Doom')}\n`);

const initializer: Initializer =
  LimitInitializer
    .and(StaticInitializer)
    .and(CoverageInitializer)
    .and(RedirectsInitializer)
    .and(ErrorInitializer)
    .and(RunInitializer);

let app: Application = express().use('/api', ApiRouter);
export const Api: Application = initializer.init(app);
