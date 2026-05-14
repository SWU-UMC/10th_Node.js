 export type ReviewItem = {
  id: number;
};

export type ReviewListResponse = {
  data: ReviewItem[];
  pagination: {
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