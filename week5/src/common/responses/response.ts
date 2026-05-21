export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}

export interface ApiErrorResponse {
  resultType: "FAILED";
  error: {
    errorCode: string | null;
    message: string | null;
    data: unknown;
  };
  data: null;
}

export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});