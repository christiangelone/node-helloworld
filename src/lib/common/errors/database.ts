import { ApiError, ApiErroraBuilder } from "./errors";

const DatabaseError: (message: string) => ApiError = 
  message => ApiErroraBuilder(500, {
    message,
    internal_code: 'database_error'
  }
);

export default DatabaseError;