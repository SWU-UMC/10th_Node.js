// 리뷰 추가 요청 타입
export interface ReviewAddRequest {
  /** 리뷰 작성자 유저 ID */
  userId: number;
  /** 리뷰 대상 가게 ID */
  storeId: number;
  /** 리뷰 내용 */
  body: string;
  /** 평점 (1~5) */
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
  /** 리뷰 ID */
  id: number;
  /** 리뷰 작성자 유저 ID */
  userId: number;
  /** 리뷰 대상 가게 ID */
  storeId: number;
  /** 리뷰 내용 */
  body: string;
  /** 평점 (1~5) */
  score: number;
  /** 리뷰 작성일 */
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
