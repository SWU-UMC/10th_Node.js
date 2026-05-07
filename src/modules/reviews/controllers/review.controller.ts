import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";
import { Request, Response } from "express";
import * as reviewService from "../services/review.service.js";

export const handleAddReview = async (req: Request, res: Response) => {
  try {
    const userId = 2;
    const result = await addReview(userId, req.body);

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const handleListUserReviews = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const cursor =
      typeof req.query.cursor === "string"
        ? Number(req.query.cursor)
        : 0;

    const result = await reviewService.listUserReviews(userId, cursor);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

