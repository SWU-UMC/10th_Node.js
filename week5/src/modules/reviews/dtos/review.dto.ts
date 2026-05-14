// 리뷰 추가 요청 타입
export interface ReviewAddRequest {
  userId: number;
  storeId: number;
  body: string;
  score: number;
}

// bodyToReview: 요청 데이터를 내부 형식으로 변환
export const bodyToReview = (body: ReviewAddRequest) => {
  return {
    userId: body.userId,
    storeId: body.storeId,
    body: body.body,
    score: body.score,
  };
};

// 리뷰 추가 응답 타입
export interface ReviewAddResponse {
  id: number;
  userId: number;
  storeId: number;
  body: string;
  score: number;
  createdAt: Date;
}

// responseFromReview: DB 결과를 응답 형식으로 변환
export const responseFromReview = (review: any): ReviewAddResponse => {
  return {
    id: review.id,
    userId: review.user_id,
    storeId: review.store_id,
    body: review.body,
    score: review.score,
    createdAt: review.created_at,
  };
};
