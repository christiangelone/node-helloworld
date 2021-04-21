import { Injectable, Inject } from "@decorators/di";
import winston, { format } from 'winston';
import { Logger, EnvLevels, Levels } from "./logger";

const { combine, timestamp, colorize, printf } = format;

@Injectable()
export default class StdLogger extends Logger {

  private logger: winston.Logger;
  
  private options(): winston.LoggerOptions {
    winston.addColors(Levels.COLORS);
    return {
      level: Levels.DEBUG,
      levels: Levels.PRIORITIES,
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(log => `${log.timestamp} |${log.level}|> ${log.message}`)
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logfile.log` })
      ]
    }
  };

  constructor(@Inject(EnvLevels) levels: EnvLevels){ 
    super(levels.getValue())
    this.logger = winston.createLogger(this.options())
  }

  protected _log(level: string, message: string): void {
    this.logger.log(level, message)
  }
};
