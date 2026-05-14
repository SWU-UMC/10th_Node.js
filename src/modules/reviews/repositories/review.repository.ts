import { prisma } from "../../../db.config.js";

export const getPreviewReview = async (storeId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    where: {
      storeId,
      id: {
        lt: cursor
      }
    },
    orderBy: {
      id: "desc"
    },
    take: 5
  });
};

export const findReviewsByUserId = async (
  userId: number,
  cursor: number
) => {
  return await prisma.userStoreReview.findMany({
    where: {
      userId,
      id: {
        gt: cursor,
      },
    },
    include: {
      store: true,
      user: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};

export const findMissionsByStoreId = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: { storeId },
    include: {
      store: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const findUserMissionsByUserId = async (userId: number) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "challenging",
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};