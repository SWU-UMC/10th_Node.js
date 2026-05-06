import { prisma } from "../../../db.config.js";

// 1. User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  // 유저가 존재하는지 확인. 있으면 에러
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (user) return null;

  const created = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      phoneNum: data.phoneNum,
    },
  });
  return created.id;
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any | null> => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 3. 음식 선호 카데고리 매핑
export const setPreference = async (
  userId: number,
  foodCategoryId: number,
): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number,
): Promise<any[]> => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    include: {
      foodCategory: true,
    },
    orderBy: { foodCategoryId: "asc" },
  });
};
