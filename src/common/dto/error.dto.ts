export interface ErrorDetail {
  errorCode: string;
  message: string;
  data?: any;
}

export interface ErrorResponse {
  resultType: "FAILED";
  error: ErrorDetail;
  data: null;
}