import { createReview, getStore } from "../../users/repositories/user.repository.js";
import { previewReviewResponseDTO } from "../dtos/review.dto.js"; //인터페이스 가져오기
import { getPreviewReview } from "../repositories/review.repository.js";
import * as reviewRepository from "../repositories/review.repository";

export const addReview = async (userId: number, data: any) => {
  const store = await getStore(data.storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await createReview(userId, data);
};

export const getReview = async (storeId: number, cursor: number) => {
		const reviews= await getPreviewReview(storeId, cursor); 
		
    return previewReviewResponseDTO(reviews);
}

export const listUserReviews = async (userId: number, cursor: number) => {
  const reviews = await reviewRepository.findReviewsByUserId(userId, cursor);

  const data = reviews.map((review: any) => ({
    id: review.id,
    store: {
      id: review.store.id,
      name: review.store.name,
    },
    user: {
      id: review.user.id,
      email: review.user.email,
      name: review.user.name,
      gender: review.user.gender,
      birth: review.user.birth,
      address: review.user.address,
      detailAddress: review.user.detailAddress,
      phoneNumber: review.user.phoneNumber,
    },
    content: review.content,
  }));

  const last = data[data.length - 1];

  return {
    data,
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};

