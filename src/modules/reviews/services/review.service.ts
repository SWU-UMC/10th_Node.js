import { createReviewRequest, getReviewsQuery } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
} from "../repositories/review.repository.js";

// 리뷰 추가
export const createReview = async (
  userId: number,
  storeId: number,
  data: createReviewRequest,
) => {
  const reviewId = await addReview(userId, storeId, {
    body: data.body,
    rate: data.rate,
  });

  if (reviewId === null) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const review = await getReview(reviewId);
  return review;
};

// 리뷰 조회
export const getReviews = async (storeId: number, query: getReviewsQuery) => {
  const reviews = await getAllStoreReviews(storeId, query);
  return reviews;
};
