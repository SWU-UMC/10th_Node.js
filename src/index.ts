// src/index.ts
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { createStore } from "./modules/stores/controllers/store.controller.js";

import {
  createReview,
  handleListStoreReviews,
  handleMyReviews,
} from "./modules/reviews/controllers/review.controller.js";

import {
  createMission,
  handleStoreMissions,
  challengeMission,
  handleMyMissions,
  completeMission,
} from "./modules/missions/controllers/mission.controller.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.get("/api/v1/users/:userId/reviews", handleMyReviews);

app.post("/api/v1/stores", createStore);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleStoreMissions);

app.post("/api/v1/reviews/:storeId", createReview);

app.post("/api/v1/missions", createMission);
app.post("/api/v1/missions/:missionId/challenge", challengeMission);

app.get("/api/v1/users/:userId/missions", handleMyMissions);

app.post(
  "/api/v1/user-missions/:userMissionId/complete",
  completeMission
);

app.listen(port, () => {
  console.log(`[server] running on port ${port}`);
});