import { Inject, Injectable } from "@decorators/di";
import { Request, Response, NextFunction } from 'express';
import { Request as Req, Response as Res, Next, Controller, Get } from '@decorators/express';

import ApiController from '../../../lib/controller';
import InfoService from "../service/info.service";
import { Logger, StdLogger } from "../../../lib/loggers";

@Controller('/info')
@Injectable()
export default class InfoController extends ApiController {
  
  constructor(
    @Inject(StdLogger) private logger: Logger,
    @Inject(InfoService) private service: InfoService
  ){
    super(logger, 'InfoController');
  }

  @Get('/')
  getInfo(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return res.send(this.service.getInfo().toJson());
  }
}