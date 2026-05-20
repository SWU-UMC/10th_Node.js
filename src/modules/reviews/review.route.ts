// src/modules/reviews/review.route.ts
import { Router } from "express";
import {
  handleListStoreReviews,
  handleMyReviews,
  createReview,
} from "./controllers/review.controller.js";

const router = Router();

// 기존
router.get("/stores/:storeId/reviews", handleListStoreReviews);
router.post("/stores/:storeId/reviews", createReview);

// 추가
router.get("/users/:userId/reviews", handleMyReviews);

export default router;
