export type ReviewItem = {
  /** 리뷰 ID */
  id: number;
  /** 리뷰 내용 */
  content?: string;
  /** 가게 ID */
  storeId?: number;
  /** 유저 ID */
  userId?: number;
};

export type ReviewListResponse = {
  /** 리뷰 목록 */
  data: ReviewItem[];
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 조회에 사용할 커서. 마지막 페이지면 null */
    cursor: number | null;
  };
};

export const responseFromReviews = (
  reviews: ReviewItem[]
): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};
