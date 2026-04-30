import dotenv from "dotenv";
dotenv.config(); // 환경 변수를 가장 먼저 로드해야 DB pool 생성 전에 적용됩니다.

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleStoreAdd } from "./modules/stores/controllers/store.controller.js";
import { handleReviewAdd } from "./modules/reviews/controllers/review.controller.js";
import { handleMissionAdd, handleUserMissionAdd } from "./modules/missions/controllers/mission.controller.js";

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleStoreAdd);         // 1-1. 특정 지역에 가게 추가
app.post("/api/v1/reviews", handleReviewAdd);       // 1-2. 가게에 리뷰 추가
app.post("/api/v1/missions", handleMissionAdd);           // 1-3. 가게에 미션 추가
app.post("/api/v1/user-missions", handleUserMissionAdd); // 1-4. 미션 도전하기

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});