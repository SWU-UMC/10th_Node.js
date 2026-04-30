import { Request, Response } from "express";
import { createReviewService } from "../services/review.service";

export const createReview = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);
  const { rating, content } = req.body;

  const review = await createReviewService(storeId, rating, content);

  res.status(201).json({ success: true, data: review });
};