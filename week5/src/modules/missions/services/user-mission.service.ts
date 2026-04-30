import { bodyToUserMission, responseFromUserMission } from "../dtos/user-mission.dto.js";
import {
  getMission,
  getUserMissionByUserAndMission,
  addUserMission,
  getUserMission,
} from "../repositories/mission.repository.js";

export const userMissionAdd = async (data: ReturnType<typeof bodyToUserMission>) => {
  // 미션 존재 여부 확인
  const mission = await getMission(data.missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  // 이미 도전 중인지 확인
  const existing = await getUserMissionByUserAndMission(data.userId, data.missionId);
  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await addUserMission({
    userId: data.userId,
    missionId: data.missionId,
  });

  const userMission = await getUserMission(userMissionId);
  return responseFromUserMission(userMission);
};
