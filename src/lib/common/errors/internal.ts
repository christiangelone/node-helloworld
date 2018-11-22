import { ApiError, ApiErroraBuilder } from ".";

const InternalError: (message: string) => ApiError = 
  message => ApiErroraBuilder(500, {
    message,
    internal_code: 'internal_error'
  }
);

export default InternalError;