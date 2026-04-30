import { bodyToMission, responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMission, getStoreById } from "../repositories/mission.repository.js";

export const missionAdd = async (data: ReturnType<typeof bodyToMission>) => {
  // 가게 존재 여부 확인
  const store = await getStoreById(data.storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    missionSpec: data.missionSpec,
  });

  const mission = await getMission(missionId);
  return responseFromMission(mission);
};
