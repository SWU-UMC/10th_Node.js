import { getMissionsQuery } from "../../missions/dtos/mission.dto.js";
import { createMissionRequest } from "../dtos/mission.dto.js";
import {
  addMission,
  getMission,
  addMemberMission,
  getMemberMission,
  getAllMyMissions,
  getMemberMissionId,
  updateSuccessMission,
  getAllStoreMissions,
} from "../repositories/mission.repository.js";

// 미션 추가
export const createMission = async (data: createMissionRequest) => {
  const missionId = await addMission({
    title: data.title,
    body: data.body,
    reward: data.reward,
    storeId: data.storeId,
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

// 미션 진행 완료로 바꾸기
export const successMission = async (userId: number, missionId: number) => {
  const memberMissionId = await getMemberMissionId(userId, missionId);
  const mission = await updateSuccessMission(memberMissionId);
  return mission;
};

// 특정 가게 미션 조회
export const getStoreMissions = async (
  storeId: number,
  query: getMissionsQuery,
) => {
  const missions = await getAllStoreMissions(storeId, query);
  return missions;
};
