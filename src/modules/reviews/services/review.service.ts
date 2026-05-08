// src/modules/reviews/services/review.service.ts
import {
  getStoreReviewsWithCursor,
  getMyReviews,
  createReview,
} from "../repositories/review.repository.js";
import {
  previewReviewResponseDTO,
  myReviewResponseDTO,
} from "../dtos/review.dto.js";

export const listStoreReviews = async (
  storeId: number,
  cursor: number
) => {
  const reviews = await getStoreReviewsWithCursor(storeId, cursor);
  return previewReviewResponseDTO(reviews);
};

export const listMyReviews = async (userId: number) => {
  const reviews = await getMyReviews(userId);
  return myReviewResponseDTO(reviews);
};

export const createReviewService = async (
  storeId: number,
  data: { userId: number; content: string; rating: number }
) => {
  return createReview({ storeId, ...data });
};