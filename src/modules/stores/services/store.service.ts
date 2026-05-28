import { StoreNotFoundError } from "../../../common/errors/error.js";
import { getMissionsQuery } from "../../missions/dtos/mission.dto.js";
import { getAllStoreMissions } from "../repositories/store.repository.js";
// 특정 가게 미션 조회
export const getStoreMissions = async (
  storeId: number,
  query: getMissionsQuery,
) => {
  const missions = await getAllStoreMissions(storeId, query);
  if (!missions) throw new StoreNotFoundError("존재하지 않는 가게입니다.");
  return missions;
};
