// src/common/responses/response.ts
export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}
export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});
