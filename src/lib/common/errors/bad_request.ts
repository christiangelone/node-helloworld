import { ApiError, ApiErroraBuilder } from "./errors";

const BadRequestError: (message: string) => ApiError = 
  message => ApiErroraBuilder(400, {
    message,
    internal_code: 'bad_request'
  }
);

export default BadRequestError;