import { readFileSync } from "fs";
import { SignOptions, VerifyOptions } from 'jsonwebtoken'
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

  readonly SIGN_OPTIONS: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN ? process.env.JWT_EXPIRES_IN : '7d',
    audience: process.env.JWT_AUDIENCE ? process.env.JWT_AUDIENCE : '',
    issuer: process.env.JWT_ISSUER ? process.env.JWT_ISSUER : '',
    subject: process.env.JWT_SUBJECT ? process.env.JWT_SUBJECT : '',
    algorithm: process.env.JWT_ALGORITHM ? process.env.JWT_ALGORITHM : 'HS256'
  }

  readonly VERIFY_OPTIONS: VerifyOptions = {
    ignoreExpiration: process.env.JWT_EXPIRABLE ? Boolean(process.env.JWT_EXPIRABLE) : false,
    audience: process.env.JWT_AUDIENCE ? process.env.JWT_AUDIENCE : '',
    issuer: process.env.JWT_ISSUER ? process.env.JWT_ISSUER : '',
    subject: process.env.JWT_SUBJECT ? process.env.JWT_SUBJECT : ''
  }

  readonly SECRET_PUB: Buffer|string  = process.env.JWT_PUBKEY_PATH 
    ? readFileSync(process.env.JWT_PUBKEY_PATH)
    : '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b';

  readonly SECRET_PRIV: Buffer|string = process.env.JWT_PRIVKEY_PATH 
    ? readFileSync(process.env.JWT_PRIVKEY_PATH)
    : '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b';

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