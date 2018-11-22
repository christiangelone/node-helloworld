import { Injectable } from "@decorators/di";
  
interface LevelsType {
  DEBUG: string;
  INFO: string;
  WARNING: string;
  ERROR: string;
  PRIORITIES: {
    DEBUG: number;
    INFO: number;
    WARNING: number;
    ERROR: number;
  };
  COLORS: {
    DEBUG: string;
    INFO: string;
    WARNING: string;
    ERROR: string;   
  }
}

export const Levels: LevelsType = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  PRIORITIES: {
    DEBUG: 3,
    INFO: 2,
    WARNING: 1,
    ERROR: 0  
  },
  COLORS: {
    DEBUG: 'cyan',
    INFO: 'green',
    WARNING: 'orange',
    ERROR: 'red' 
  }
};

@Injectable()
export class EnvLevels {
  getValue(): string[] {
    return process.env.LOGGING_LEVELS ? process.env.LOGGING_LEVELS.split(',') : [Levels.DEBUG];
  }
};

export abstract class Logger {

  constructor(private levels: string[]){}

  log(level: string, message: string,): void {
    if(this.canLog(level)) this._log(level, message)
  }

  private canLog(level: string): boolean {
    return this.levels.indexOf(level) > -1;
  }

  protected abstract _log(level: string, message: string): void;
};