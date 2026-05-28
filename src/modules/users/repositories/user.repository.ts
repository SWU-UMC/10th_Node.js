import { prisma } from "../../../db.config.js";
import { getReviewsQuery } from "../../reviews/dtos/review.dto.js";
import { ChangeUser } from "../dtos/user.dto.js";

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
  return await prisma.user.findFirst({ where: { id: userId } });
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

// 내가 작성한 리뷰들 조회하기
export const getAllMyReviews = async (
  userId: number,
  query: getReviewsQuery,
) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const offset = (page - 1) * limit;
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      rate: true,
      user: true,
      store: true,
    },
    where: { userId },
    skip: offset,
    take: limit,
    orderBy: { id: "asc" },
  });

  return reviews;
};

// 내 정보 수정하기
export const updateMe = async (userId: number, body: ChangeUser) => {
  const user = await prisma.user.update({
    data: {
      name: body.name,
      gender: body.gender,
      birth: body.birth,
      address: body.address,
      phoneNum: body.phoneNum,
    },
    where: { id: userId },
  });
};
