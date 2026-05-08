import { prisma } from "../../../db.config.js";

// 가게 리뷰 목록 (커서 기반 페이지네이션)
export const getStoreReviewsWithCursor = async (
  storeId: number,
  cursor: number,
  take = 5
) => {
  return prisma.userStoreReview.findMany({
    where: {
      storeId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take,
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

// 내가 작성한 리뷰 목록
export const getMyReviews = async (userId: number) => {
  return prisma.userStoreReview.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      store: {
        select: {
          name: true,
        },
      },
    },
  });
};

// 리뷰 생성
export const createReview = async (data: {
  storeId: number;
  userId: number;
  content: string;
  rating: number;
}) => {
  return prisma.userStoreReview.create({
    data,
  });
};