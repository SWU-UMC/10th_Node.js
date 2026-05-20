// src/common/dto/api.dto.ts
export interface SuccessResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}

export interface ErrorResponse {
  resultType: "FAILED";
  error: {
    errorCode: string;
    message: string;
    data?: any;
  };
  data: null;
}
