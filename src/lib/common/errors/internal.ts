import { ApiError, ApiErroraBuilder } from "./errors";

const InternalError: (message: string) => ApiError = 
  message => ApiErroraBuilder(500, {
    message,
    internal_code: 'internal_error'
  }
);

export default InternalError;