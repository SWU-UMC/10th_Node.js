// src/index.ts
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// passport 전략 등록
passport.use(googleStrategy);
passport.use(jwtStrategy);

// passport 먼저 초기화 (중요)
app.use(passport.initialize());

// 공통 미들웨어
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// success / error 응답 통일
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).success = function (data: any) {
    return this.json({
      resultType: "SUCCESS",
      error: null,
      data,
    });
  };

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

// JWT 인증 미들웨어
const isLogin = passport.authenticate("jwt", { session: false });

// 테스트용 보호된 라우트
app.get("/mypage", isLogin, (req, res) => {
  (res as any).success({
    message: `인증 성공! ${(req.user as any).name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

// API 라우터 연결
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

// Google OAuth
app.get(
  "/oauth2/login/google",
  passport.authenticate("google", { session: false })
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    (res as any).success({
      message: "구글 로그인 성공",
      tokens: req.user,
    });
  }
);

// Swagger 설정
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 에러 처리 (맨 아래)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  (res as any).status(err.statusCode || 500).error({
    errorCode: err.errorCode || "UNKNOWN",
    message: err.message || "Internal Server Error",
    data: err.data || null,
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`[server] running on port ${port}`);
});