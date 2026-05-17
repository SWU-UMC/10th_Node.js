import { prisma } from "../../../db.config.js";
import { getMissionsQuery } from "../../missions/dtos/mission.dto.js";

// 특정 가게의 미션 목록 조회
export const getAllStoreMissions = async (
  storeId: number,
  query: getMissionsQuery,
) => {
  // 가게 존재하는 확인, 없으면 에러
  const store = await prisma.store.findFirst({ where: { id: storeId } });
  if (!store) return null;

  const page = query.page || 1;
  const limit = query.limit || 10;
  const offset = (page - 1) * limit;
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      reward: true,
      store: true,
    },
    where: { storeId },
    skip: offset,
    take: limit,
    orderBy: { id: "asc" },
  });
  return missions;
};
