import { Request } from "express";
import { Injectable } from "@decorators/di";
import { Endpoint } from "../../entities";

export default abstract class AuthService {

  readonly AUTH_HEADER: string = process.env.AUTH_HEADER || 'authorization';

  constructor(name: string){
    console.log(`${name} loaded.`);
  }
  abstract sign(entity: any): Promise<string>;
  abstract verify<T>(token: string): Promise<T>;
}