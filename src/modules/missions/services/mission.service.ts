import { createMissionRequest } from "../dtos/mission.dto.js";
import {
  addMission,
  getMission,
  addMemberMission,
  getMemberMission,
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
    throw new Error("");
  }

  const memberMission = await getMemberMission(memberMissionId);
  return memberMission;
};
