import { AppError } from "./app.error";

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

export class StoreNotFoundError extends AppError {
  constructor(data?: unknown) {
    super({
      errorCode: "S001",
      statusCode: 404,
      message: "존재하지 않는 가게입니다.",
      data,
    });
  }
}

export class MissionAlreadyChallengingError extends AppError {
  constructor(data?: unknown) {
    super({
      errorCode: "M001",
      statusCode: 409,
      message: "이미 도전 중인 미션입니다.",
      data,
    });
  }
}
