import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
import {
  handleCreateMission,
  handleMemberMission,
  handleGetMyMissions,
  handleSuccessMission,
  handleGetStoreMission,
} from "./modules/missions/controllers/mission.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({
    errorCode = null,
    message = null,
    data = null,
  }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(morgan("dev"));
app.use(cookieParser());

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.post("/api/v1/missions", handleCreateMission); // 가게에 미션 추가하기
app.post("/api/v1/users/missions/:missionId", handleMemberMission); // 가게의 미션을 도전 중인 미션에 추가하기
app.get("/api/v1/users/missions", handleGetMyMissions); // 내가 진행 중인 미션 조회
app.get("/api/v1/users/missions/:missionId/success", handleSuccessMission); // 미션 진행 완료로 바꾸기
app.get("/api/v1/stores/:storeId/missions", handleGetStoreMission); // 특정 가게의 미션 조회

// 전역 오류를 처리하기 위한 미들웨어
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500).json({
    resultType: "FAILED",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.message || null,
      data: err.data || null,
    },
    data: null,
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
