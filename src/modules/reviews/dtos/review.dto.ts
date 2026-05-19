export interface CreateReviewRequest {
  /** 리뷰를 작성할 가게 ID */
  storeId: number;
  /** 리뷰 내용 */
  content: string;
}

export const previewReviewResponseDTO = (data: any[]) => {
  return {
    reviewData: data,
    cursorId: data.length > 0 ? data[data.length - 1].id : null,
  };
};
