import { Inject, Injectable } from "@decorators/di";
import { Request, Response, NextFunction } from 'express';
import { Request as Req, Response as Res, Next, Controller, Get } from '@decorators/express';

import ApiController from '../../../lib/controller';
import { Logger, StdLogger } from "../../../lib/loggers";
import { AuthMiddleware } from "../../../lib/common/middlewares";

@Controller('/env', [AuthMiddleware])
@Injectable()
export default class EnvController extends ApiController {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super(logger, 'EnvController');
  }

  @Get('/')
  getEnv(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return res.json(process.env);
  }
}