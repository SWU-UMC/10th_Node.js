import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { addReview, getReview, getStoreById } from "../repositories/review.repository.js";

export const reviewAdd = async (data: ReturnType<typeof bodyToReview>) => {
  // 가게 존재 여부 확인
  const store = await getStoreById(data.storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await addReview({
    userId: data.userId,
    storeId: data.storeId,
    body: data.body,
    score: data.score,
  });

  const review = await getReview(reviewId);
  return responseFromReview(review);
};
