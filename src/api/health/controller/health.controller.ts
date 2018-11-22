import { Inject, Injectable } from "@decorators/di";
import { Request, Response, NextFunction } from 'express';
import { Request as Req, Response as Res, Next, Controller, Get } from '@decorators/express';

import ApiController from '../../../lib/controller';
import StdLogger from "../../../lib/loggers/std_logger";
import { Logger, Levels } from "../../../lib/loggers/logger";

@Controller('/health')
@Injectable()
export default class HealthController extends ApiController {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super('HealthController');
  }

  @Get('/')
  getInfo(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return res.json({
      status: 'OK'
    });
  }
}