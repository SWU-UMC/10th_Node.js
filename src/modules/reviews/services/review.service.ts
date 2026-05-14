import { createReviewRequest, getReviewsQuery } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
} from "../repositories/review.repository.js";
import { StoreNotFoundError } from "../../../common/errors/error.js";

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
    throw new StoreNotFoundError("존재하지 않는 가게입니다.");
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
  if (reviews === null) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.");
  }
  return reviews;
};
