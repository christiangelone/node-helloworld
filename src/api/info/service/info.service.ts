import { Inject, Injectable } from "@decorators/di";
import ApiService from "../../../lib/service";

import Info from '../model/info.model';
import StdLogger  from "../../../lib/loggers/std_logger";
import { Logger, Levels } from "../../../lib/loggers/logger";

@Injectable()
export default class InfoService extends ApiService {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super('InfoService');
  }

  getInfo(): Info {
    return new Info();
  }
};
