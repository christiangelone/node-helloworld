import express, { Router } from 'express';
import { attachControllers } from '@decorators/express';

import HealthController from './controller/health.controller';

const router: Router = express.Router();
attachControllers(router, [HealthController]);

const HealthRouter: Router = router;
export default HealthRouter;