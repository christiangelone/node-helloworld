import { Inject, Injectable } from '@decorators/di';
import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import { Request as Req, Response as Res, Next } from '@decorators/express';
import { UnAuthorizedError } from '../errors';
import { AuthService, JwtAuthService } from '../services';
import { Endpoint, JwtUser } from '../entities';

@Injectable()
export default class AuthMiddleware implements Middleware {

  constructor(@Inject(JwtAuthService) private service: AuthService){}

  use(@Req() req: Request|any, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
    const endpoint: Endpoint = { method: req.method, route: req.originalUrl };
    const token: string | undefined = req.header(this.service.AUTH_HEADER)
    return !token
      ? Promise.resolve(
        next(UnAuthorizedError(endpoint, `missing ${this.service.AUTH_HEADER} header`))
      )
      : this.service
          .verify<JwtUser>(token)
          .then((user: JwtUser) => {
            req.user = user;
            return next();
          })
          .catch(err => next(UnAuthorizedError(endpoint, err.message)));
  }
}