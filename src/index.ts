import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import {
  handleCreateReview,
  handleGetMyReviews,
  handleGetStoreReviews,
} from "./modules/reviews/controllers/review.controller.js";
import {
  handleCreateMission,
  handleMemberMission,
  handleGetMyMissions,
  handleSuccessMission,
} from "./modules/missions/controllers/mission.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.post("/api/v1/users/signup", handleUserSignUp); // 회원가입
app.post("/api/v1/stores/:storeId/review", handleCreateReview); // 가게에 리뷰 추가하기
app.post("/api/v1/missions", handleCreateMission); // 가게에 미션 추가하기
app.post("/api/v1/users/missions/:missionId", handleMemberMission); // 가게의 미션을 도전 중인 미션에 추가하기
app.get("/api/v1/stores/:storeId/reviews", handleGetStoreReviews); // 가게 리뷰들 조회
app.get("/api/v1/users/reviews", handleGetMyReviews); // 내가 작성한 리뷰들 조회
app.get("/api/v1/users/missions", handleGetMyMissions); // 내가 진행 중인 미션 조회
app.get("/api/v1/users/missions/:missionId/success", handleSuccessMission); // 미션 진행 완료로 바꾸기

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
