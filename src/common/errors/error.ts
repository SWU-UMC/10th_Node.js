// src/common/errors/error.ts
import { AppError } from "./app.error.js";

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

export class MissionAlreadyInProgressError extends AppError {
  constructor() {
    super({
      errorCode: "M001",
      statusCode: 400,
      message: "이미 도전 중인 미션입니다.",
    });
  }
}

export class MissionAlreadyCompletedError extends AppError {
  constructor() {
    super({
      errorCode: "M002",
      statusCode: 400,
      message: "이미 완료한 미션입니다.",
    });
  }
}
