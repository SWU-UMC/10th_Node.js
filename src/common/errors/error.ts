import { AppError } from "./app.error.js";

/** User 에러 */
export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}
export class UserNotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U002",
      statusCode: 404,
      message,
      data,
    });
  }
}
export class UnauthorizedUserError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U003",
      statusCode: 401,
      message,
      data,
    });
  }
}

/** Store 에러 */
export class StoreNotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "S002",
      statusCode: 404,
      message,
      data,
    });
  }
}

/** Mission 에러 */
export class MissionNotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "M002",
      statusCode: 404,
      message,
      data,
    });
  }
}
