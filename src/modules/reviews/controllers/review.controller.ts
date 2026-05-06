import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReview, getReviews } from "../services/review.service.js";

// 리뷰 추가
export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body: ", req.body);

  const userId = 4;
  const storeId = 1;
  const review = await createReview(userId, storeId, req.body);

  res.status(StatusCodes.OK).json({ result: review });
};

// 리뷰 조회
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
    const reviews = await getReviews(storeId, query);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};
