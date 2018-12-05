import { Server } from 'http';
import express, { Application } from 'express';
import ApiRouter from './api/index';
import {
  StaticInitializer, 
  CoverageInitializer, 
  LimitInitializer, 
  RedirectsInitializer, 
  ErrorInitializer,
  RunInitializer
} from './initializers';

let app: Application = express().use('/api', ApiRouter);
app = LimitInitializer(app);
app = StaticInitializer(app);
app = CoverageInitializer(app);
app = RedirectsInitializer(app);
app = ErrorInitializer(app);
app = RunInitializer(app);

export const Api = app;
