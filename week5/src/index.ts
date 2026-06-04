import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import { RegisterRoutes } from "./routes.js";
import { AppError } from "./common/errors/app.error.js";

// 1. TSOA가 생성한 swagger.json 읽어오기
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src/swagger.json"), "utf8")
);

// res.error 메서드 타입 확장
declare global {
  namespace Express {
    interface Response {
      error: (params: {
        errorCode?: string | null;
        message?: string | null;
        data?: unknown;
      }) => Response;
    }
  }
}

const app: Express = express();
const port = process.env.PORT || 3000;

// res.error 메서드 주입
app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

// 미들웨어 설정
app.use(morgan("dev"));         
app.use(cors());
app.use(cookieParser());        
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});