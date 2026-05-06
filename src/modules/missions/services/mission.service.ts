import { getMissionsQuery } from "../../missions/dtos/mission.dto.js";
import { createMissionRequest } from "../dtos/mission.dto.js";
import {
  addMission,
  getMission,
  addMemberMission,
  getMemberMission,
  getAllMyMissions,
} from "../repositories/mission.repository.js";

// 미션 추가
export const createMission = async (
  storeId: number,
  data: createMissionRequest,
) => {
  const missionId = await addMission(storeId, {
    title: data.title,
    body: data.body,
    reward: data.reward,
  });

  if (missionId === null) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const mission = await getMission(missionId);
  return mission;
};

// 도전 중인 미션에 추가
export const createMemberMission = async (
  userId: number,
  missionId: number,
) => {
  const memberMissionId = await addMemberMission(userId, missionId);

  if (memberMissionId === null) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const memberMission = await getMemberMission(memberMissionId);
  return memberMission;
};

// 내가 진행 중인 미션 목록
export const getMyMissions = async (
  userId: number,
  query: getMissionsQuery,
) => {
  const missions = await getAllMyMissions(userId, query);
  return missions;
};
