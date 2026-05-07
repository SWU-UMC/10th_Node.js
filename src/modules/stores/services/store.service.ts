import { getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromReviews, ReviewListResponse } from "../dtos/store.dto";

export const listStoreReviews = async (
  storeId: number,
  cursor: number
): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);

  return responseFromReviews(reviews);
};