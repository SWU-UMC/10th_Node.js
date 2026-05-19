import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  // 1. 이미 존재하는 이메일인지 확인
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  
  if (user) {
    return null;
  }

  // 2. 새로운 유저 생성
  const created = await prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    } 
  });

  return created.id;
};

export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true,
    },
    orderBy: { foodCategoryId: "asc" },
  });
};



export const getStore = async (storeId: number) => {
  return await prisma.store.findFirstOrThrow({ where: { id: storeId } });   
};

export const createReview = async (userId: number, data: any) => {
  return await prisma.userStoreReview.create({
    data: {
      userId,
      storeId: data.storeId,
      content: data.content
    }
  });
};