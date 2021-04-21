import { Inject, Injectable } from "@decorators/di";
import ApiService from "../../../lib/service";

import Info from '../model/info.model';
import { Logger, Levels, StdLogger } from "../../../lib/loggers";

@Injectable()
export default class InfoService extends ApiService {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super(logger, 'InfoService');
  }

  getInfo(): Info {
    return new Info();
  }
};
