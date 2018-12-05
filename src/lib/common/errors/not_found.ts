import { ApiError, ApiErroraBuilder } from "./errors";

const NotFoundError: (thing: string) => ApiError = 
  thing => ApiErroraBuilder(404, {
    message: `${thing} not found`,
    internal_code: 'not_found'
  }
)

export default NotFoundError;