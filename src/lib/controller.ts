import { Levels, Logger } from "./loggers";

export default abstract class ApiController {

  constructor(logger: Logger, protected name: string = 'Controller'){ 
    logger.log(Levels.INFO, `${name} loaded.`); 
  }
}