import { prisma } from "../../../db.config.js";
import { createReviewRequest, getReviewsQuery } from "../dtos/review.dto.js";

// 리뷰 추가하기
export const addReview = async (
  userId: number,
  storeId: number,
  data: createReviewRequest,
): Promise<number | null> => {
  await prisma.store.findFirstOrThrow({
    where: { id: storeId },
  });

  const created = await prisma.review.create({
    data: {
      body: data.body,
      rate: data.rate,
      userId,
      storeId,
    },
  });

  return created.id;
};

// 리뷰 조회하기
export const getReview = async (reviewId: number): Promise<any | null> => {
  return await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
};

// 리뷰들 조회하기
export const getAllStoreReviews = async (
  storeId: number,
  query: getReviewsQuery,
) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const offset = (page - 1) * limit;
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      rate: true,
      user: true,
      store: true,
    },
    where: { storeId },
    skip: offset,
    take: limit,
    orderBy: { id: "asc" },
  });

  return reviews;
};
