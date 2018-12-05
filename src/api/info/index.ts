import express, { Router } from 'express';
import { attachControllers } from '@decorators/express';

import InfoController from './controller/info.controller';

const router: Router = express.Router();
attachControllers(router, [InfoController]);

const InfoRouter: Router = router;
export default InfoRouter;