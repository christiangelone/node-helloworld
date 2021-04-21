import { Inject, Injectable } from "@decorators/di";
import { Request, Response, NextFunction } from 'express';
import { Request as Req, Response as Res, Next, Controller, Get } from '@decorators/express';

import ApiController from '../../../lib/controller';
import { Logger, StdLogger } from "../../../lib/loggers";

@Controller('/health')
@Injectable()
export default class HealthController extends ApiController {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super(logger, 'HealthController');
  }

  @Get('/')
  getInfo(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return res.json({
      status: 'UP'
    });
  }
}