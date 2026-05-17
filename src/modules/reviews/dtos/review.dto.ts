// 리뷰 생성 요청
export interface createReviewRequest {
  body: string;
  rate: number;
}

// 리뷰 조회
export interface getReviewsQuery {
  page: number;
  limit: number;
}
