// src/modules/reviews/dtos/review.dto.ts
export const previewReviewResponseDTO = (reviews: any[]) => {
  const last = reviews[reviews.length - 1];

  return {
    data: reviews.map((r) => ({
      nickname: r.user.name,
      rating: r.rating,
      content: r.content,
      createdAt: r.createdAt,
    })),
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};

export const myReviewResponseDTO = (reviews: any[]) => ({
  data: reviews.map((r) => ({
    storeName: r.store.name,
    rating: r.rating,
    content: r.content,
    createdAt: r.createdAt,
  })),
});