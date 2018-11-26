import { Request } from "express";
import { ApiError, ApiErroraBuilder } from "./errors";

const NotImplementedError: (req: Request) => ApiError = 
  req => ApiErroraBuilder(501, {
    message: `endpoint ${req.method} ${req.originalUrl} is not implemented`,
    internal_code: 'not_implemented'
  })

export default NotImplementedError;