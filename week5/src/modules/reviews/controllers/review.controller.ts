import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, ReviewAddRequest } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

// 가게에 리뷰 추가하기
export const handleReviewAdd = async (req: Request, res: Response, next: NextFunction) => {
  const review = await reviewAdd(bodyToReview(req.body as ReviewAddRequest));
  res.status(StatusCodes.CREATED).json({ result: review });
};
