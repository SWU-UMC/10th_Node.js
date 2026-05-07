import { prisma } from "../../../db.config.js";

export const getUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.findUnique({
    where: {
      userId_missionId: { userId, missionId },
    },
  });               
};

export const createUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "진행중",
    },
  });   
};

//가게에 미션 추가하기
export const createMission = async (data: any) => {
  return await prisma.mission.create({
    data: {
      storeId: data.storeId,
      content: data.content,
      reward: data.reward,
      deadline: data.deadline
    }
  });
};

export const findMissionsByStoreId = async (
  storeId: number,
  cursor: number
) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
      id: {
        gt: cursor,
      },
    },
    include: {
      store: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};

export const findUserMissionsByUserId = async (
  userId: number,
  cursor: number
) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "challenging", // 진행중만
      id: {
        gt: cursor,
      },
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};