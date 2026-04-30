import {
  insertMission,
  getUserMission,
  insertUserMission,
} from "../repositories/mission.repository";

// 미션 생성
export const createMissionService = async (data: {
  storeId: number;
  condition: string;
  rewardPoint: number;
}) => {
  return await insertMission(
    data.storeId,
    data.condition,
    data.rewardPoint
  );
};

// 미션 도전
export const challengeMissionService = async (
  userId: number,
  missionId: number
) => {
  const exists = await getUserMission(userId, missionId);
  if (exists) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  await insertUserMission(userId, missionId);

  return {
    userId,
    missionId,
    status: "IN_PROGRESS",
  };
};