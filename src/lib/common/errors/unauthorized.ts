import { Endpoint } from "../entities";
import { ApiError, ApiErroraBuilder } from "./errors";

const UnAuthorizedError: (endpoint: Endpoint, reason: string) => ApiError = 
  (endpoint: Endpoint, reason: string = 'unknown reason') => ApiErroraBuilder(401, {
    message: `you are not allowed to access endpoint ${endpoint.method} ${endpoint.route} >> ${reason}`,
    internal_code: 'unauthorized'
  })

export default UnAuthorizedError;