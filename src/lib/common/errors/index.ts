class ErrorResponse {
  constructor(
    public message: string,
    public internal_code: string
  ){}
};

export interface ApiError {
  statusCode: number;
  error: ErrorResponse
};

export const ApiErroraBuilder: (statusCode: number, error: ErrorResponse) => ApiError =
  (statusCode: number, error: ErrorResponse) => ({
    statusCode,
    error
  });
