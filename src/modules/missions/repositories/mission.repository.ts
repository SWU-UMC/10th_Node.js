import { prisma } from "../../../db.config.js";
import { createMissionRequest } from "../dtos/mission.dto.js";

export const addMission = async (
  storeId: number,
  data: createMissionRequest,
): Promise<any | null> => {
  // 가게 존재하는지 확인 없으면 에러
  await prisma.store.findFirstOrThrow({
    where: { id: storeId },
  });

  const created = await prisma.mission.create({
    data: {
      title: data.title,
      body: data.body,
      reward: data.reward,
    },
  });
  return created.id;
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  return await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
};

// 도전 중인 미션 추가
export const addMemberMission = async (
  userId: number,
  missionId: number,
): Promise<any | null> => {
  // 유저가 존재하는지 확인, 없으면 에러
  await prisma.user.findFirstOrThrow({ where: { id: userId } });

  const created = await prisma.memberMission.create({
    data: {
      status: "CHALLENGING",
      userId,
      missionId,
    },
  });
  return created.id;
};

// 도전 중인 미션 조회
export const getMemberMission = async (
  memberMissionId: number,
): Promise<any | null> => {
  await prisma.memberMission.findFirstOrThrow({
    where: { id: memberMissionId },
  });
};
