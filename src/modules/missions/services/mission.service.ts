// src/modules/missions/services/mission.service.ts

import {
  insertMission,
  getUserMission,
  insertUserMission,
  findMissionsByStore,
  findUserMissions,
  completeUserMission,
} from "../repositories/mission.repository.js";

// ✅ repository 반환 타입 추론
type StoreMissionResult = Awaited<
  ReturnType<typeof findMissionsByStore>
>[number];

type UserMissionResult = Awaited<
  ReturnType<typeof findUserMissions>
>[number];

export const createMissionService = async (data: {
  storeId: number;
  condition: string;
  rewardPoint: number;
}) => {
  return insertMission(
    data.storeId,
    data.condition,
    data.rewardPoint
  );
};

export const listStoreMissionsService = async (storeId: number) => {
  const missions = await findMissionsByStore(storeId);

  return {
    data: missions.map((m: StoreMissionResult) => ({
      missionId: m.id,
      content: m.conditionText,
      reward: m.rewardPoint,
      store: {
        id: m.store.id,
        name: m.store.name,
      },
    })),
  };
};

export const challengeMissionService = async (
  userId: number,
  missionId: number
) => {
  const exists = await getUserMission(userId, missionId);

  if (exists) {
    if (exists.status === "IN_PROGRESS") {
      throw new Error("이미 도전 중인 미션입니다.");
    }
    if (exists.status === "COMPLETED") {
      throw new Error("이미 완료한 미션입니다.");
    }
  }

  const created = await insertUserMission(userId, missionId);

  return {
    userMissionId: created.id,
    status: "IN_PROGRESS",
  };
};

export const listMyMissionsService = async (
  userId: number,
  status?: string
) => {
  const missions = await findUserMissions(userId, status);

  return missions.map((um: UserMissionResult) => ({
    id: um.id,
    status: um.status.toLowerCase(),
    mission: {
      id: um.mission.id,
      content: um.mission.conditionText,
      reward: um.mission.rewardPoint,
      deadline: null,
      store: {
        id: um.mission.store.id,
        name: um.mission.store.name,
      },
    },
  }));
};

export const completeMissionService = async (
  userMissionId: number
) => {
  await completeUserMission(userMissionId);
  return { success: true };
};