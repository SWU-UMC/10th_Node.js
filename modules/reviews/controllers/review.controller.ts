// src/modules/reviews/controllers/review.controller.ts
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  listStoreReviews,
  createReviewService,
  listMyReviews,
} from "../services/review.service.js";
import { success } from "../../../common/responses/response.js";

export const handleListStoreReviews = async (
  req: Request<{ storeId: string }, any, any, { cursor?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = Number(req.params.storeId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : 0;
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(success(reviews));
  } catch (err) {
    next(err);
  }
};

export const handleMyReviews = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId);
    const reviews = await listMyReviews(userId);
    res.status(StatusCodes.OK).json(success(reviews));
  } catch (err) {
    next(err);
  }
};

export const createReview = async (
  req: Request<{ storeId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = Number(req.params.storeId);
    const review = await createReviewService(storeId, req.body);
    res.status(StatusCodes.CREATED).json(success(review));
  } catch (err) {
    next(err);
  }
};
