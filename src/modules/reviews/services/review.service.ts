import { createReviewRequest, getReviewsQuery } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
  getAllMyReviews,
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

// 가게 리뷰 조회
export const getStoreReviews = async (
  storeId: number,
  query: getReviewsQuery,
) => {
  const reviews = await getAllStoreReviews(storeId, query);
  return reviews;
};

// 내가 작성한 리뷰 조회
export const getMyReviews = async (userId: number, query: getReviewsQuery) => {
  const reviews = await getAllMyReviews(userId, query);
  return reviews;
};
