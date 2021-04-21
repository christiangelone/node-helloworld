import { Levels, Logger } from "./loggers";

export default abstract class ApiService {

  constructor(logger: Logger, protected name: string = 'Service'){ 
    logger.log(Levels.INFO, `${name} loaded.`); 
  }
}