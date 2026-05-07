import {
  getUserMission,
  createUserMission,
  createMission
} from "../repositories/mission.repository.js";
import { getStore } from "../../users/repositories/user.repository.js";
import * as missionRepository from "../repositories/mission.repository.js";

export const challengeMission = async (userId: number, missionId: number) => {
  const existing = await getUserMission(userId, missionId);

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  await createUserMission(userId, missionId);
};

export const addMission = async (data: any) => {
  const store = await getStore(data.storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await createMission(data);
};

export const listStoreMissions = async (storeId: number,cursor: number) => {
  const missions = await missionRepository.findMissionsByStoreId(storeId,cursor);

  return missions.map((mission: any) => ({
    id: mission.id,
    store: {
      id: mission.store.id,
      name: mission.store.name,
    },
    content: mission.content,
    reward: mission.reward,
    deadline: mission.deadline,
  }));
};

export const listUserMissions = async (userId: number, cursor: number) => {
  const userMissions = await missionRepository.findUserMissionsByUserId(
    userId,
    cursor
  );

  const data = userMissions.map((um: any) => ({
    id: um.id,
    status: um.status,
    mission: {
      id: um.mission.id,
      content: um.mission.content,
      reward: um.mission.reward,
      deadline: um.mission.deadline,
      store: {
        id: um.mission.store.id,
        name: um.mission.store.name,
      },
    },
  }));

  const last = data[data.length - 1];

  return {
    data,
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};