import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  listStoreReviews,
  createReviewService,
  listMyReviews,
} from "../services/review.service.js";

/**
 * 기존: 특정 가게 리뷰 목록
 */
export const handleListStoreReviews = async (
  req: Request<{ storeId: string }, any, any, { cursor?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = Number(req.params.storeId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

/**
 * 추가: 내가 작성한 리뷰 목록
 */
export const handleMyReviews = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);

    const reviews = await listMyReviews(userId);
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

/**
 * 기존: 리뷰 생성
 */
export const createReview = async (
  req: Request<{ storeId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = Number(req.params.storeId);
    const review = await createReviewService(storeId, req.body);
    res.status(StatusCodes.CREATED).json(review);
  } catch (err) {
    next(err);
  }
};