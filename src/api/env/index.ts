import express, { Router } from 'express';
import { attachControllers } from '@decorators/express';

import EnvController from './controller/env.controller';

const router: Router = express.Router();
attachControllers(router, [EnvController]);

const EnvRouter: Router = router;
export default EnvRouter;