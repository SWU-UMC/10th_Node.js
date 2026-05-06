import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createReview,
  getMyReviews,
  getStoreReviews,
} from "../services/review.service.js";

// 리뷰 추가
export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = 1;
    const storeId = parseInt(req.params.storeId as string, 10);
    const review = await createReview(userId, storeId, req.body);

    res.status(StatusCodes.OK).json({ result: review });
  } catch (err) {
    next(err);
  }
};

// 가게의 리뷰 조회
export const handleGetStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };
    const storeId = parseInt(req.params.storeId as string, 10);
    const reviews = await getStoreReviews(storeId, query);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

// 내가 작성한 리뷰 조회
export const handleGetMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };
    const userId = 1;
    const reviews = await getMyReviews(userId, query);
  } catch (err) {
    next(err);
  }
};
