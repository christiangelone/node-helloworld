import { Injectable } from "@decorators/di";
  
interface LevelsType {
  DB: string;
  DEBUG: string;
  INFO: string;
  WARNING: string;
  ERROR: string;
  PRIORITIES: {
    DB: number;
    DEBUG: number;
    INFO: number;
    WARNING: number;
    ERROR: number;
  };
  COLORS: {
    DB: string;
    DEBUG: string;
    INFO: string;
    WARNING: string;
    ERROR: string;   
  }
}

export const Levels: LevelsType = {
  DB: 'DB',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  PRIORITIES: {
    DB: 4,
    DEBUG: 3,
    INFO: 2,
    WARNING: 1,
    ERROR: 0
  },
  COLORS: {
    DB: 'yellow',
    DEBUG: 'cyan',
    INFO: 'green',
    WARNING: 'orange',
    ERROR: 'red' 
  }
};

@Injectable()
export class EnvLevels {
  getValue(): string[] {
    return process.env.LOGGING_LEVELS
      ? process.env.LOGGING_LEVELS.split(',').map(l => l.toUpperCase())
      : [Levels.DEBUG];
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