// user.repository.ts
import { prisma } from "../../../db.config.js";

export const addUser = async (data: any) => {
  const exists = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (exists) return null;

  const created = await prisma.user.create({
    data,
  });

  return created.id;
};

export const getUser = async (userId: number) => {
  return prisma.user.findFirstOrThrow({
    where: { id: userId },
  });
};

export const setPreference = async (
  userId: number,
  foodCategoryId: number
) => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId: number) => {
  return prisma.userFavorCategory.findMany({
    where: { userId },
    include: {
      foodCategory: true,
    },
    orderBy: {
      foodCategoryId: "asc",
    },
  });
};

export const updateUser = async (
  userId: number,
  data: Partial<{
    name: string;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string;
    phoneNumber: string;
  }>
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};