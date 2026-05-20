// src/modules/missions/repositories/mission.repository.ts
import { prisma } from "../../../db.config.js";

export const insertMission = async (
  storeId: number,
  condition: string,
  rewardPoint: number
) => {
  const mission = await prisma.mission.create({
    data: {
      storeId,
      conditionText: condition,
      rewardPoint,
    },
  });

  return {
    id: mission.id,
    storeId: mission.storeId,
    condition: mission.conditionText,
    rewardPoint: mission.rewardPoint,
  };
};

export const findMissionsByStore = async (storeId: number) => {
  return prisma.mission.findMany({
    where: { storeId },
    include: {
      store: {
        select: { id: true, name: true },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const getUserMission = async (
  userId: number,
  missionId: number
) => {
  return prisma.userMission.findUnique({
    where: {
      userId_missionId: { userId, missionId },
    },
  });
};

export const insertUserMission = async (
  userId: number,
  missionId: number
) => {
  return prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "IN_PROGRESS",
    },
  });
};

export const findUserMissions = async (
  userId: number,
  status?: string
) => {
  return prisma.userMission.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
    },
    include: {
      mission: {
        include: {
          store: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const completeUserMission = async (
  userMissionId: number
) => {
  return prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "COMPLETED" },
  });
};
