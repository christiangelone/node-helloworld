import { Inject, Injectable } from "@decorators/di";
import { Request } from "express";

import { Logger, Levels, StdLogger } from "../../../../lib/loggers";
import AuthService from "./auth";
import { UnAuthorizedError, InternalError } from "../../errors";
import { Endpoint } from "../../entities";

import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';

@Injectable()
export default class JwtAuthService extends AuthService {
  
  constructor(
    @Inject(StdLogger) private logger: Logger
  ){
    super('JwtAuthService');
  }

  sign(entity: any): Promise<string> {
    return new Promise<string>((res, rej) => {
      jsonwebtoken.sign(entity, this.SECRET_PRIV, this.SIGN_OPTIONS,
        (err: Error, encoded: string) => {
          if(err) rej(err);
          else res(encoded)
        }
      )
    }).catch(err => InternalError(err.message))
  }

  verify<T>(token: string): Promise<T> {
    return new Promise<T>((res, rej) => {
      jsonwebtoken.verify(token, this.SECRET_PUB, this.VERIFY_OPTIONS,
        (err: VerifyErrors, decoded: object|string) => {
          if(err) rej(err);
          else res(<T><any> decoded)
        }
      )       
    });
  }
};