import { insertReview, getStoreById } from "../repositories/review.repository";

export const createReviewService = async (
  storeId: number,
  rating: number,
  content: string
) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 특정 사용자 = 첫 번째 사용자 (id=1)
  return await insertReview(storeId, 1, rating, content);
};
