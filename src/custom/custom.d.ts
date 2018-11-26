import { JwtUser } from "../lib/common/entities";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtUser
    }
  }
}