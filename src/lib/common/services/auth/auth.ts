import { Request } from "express";
import { Injectable } from "@decorators/di";
import { readFileSync } from "fs";
import { Endpoint } from "../../entities";
import { SignOptions, VerifyOptions } from 'jsonwebtoken'

export default abstract class AuthService {

  readonly AUTH_HEADER: string = process.env.AUTH_HEADER || 'authorization';

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

  constructor(name: string){
    console.log(`${name} loaded.`);
  }
  abstract sign(entity: any): Promise<string>;
  abstract verify<T>(token: string): Promise<T>;
}