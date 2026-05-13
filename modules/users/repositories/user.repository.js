// user.repository.ts
import { prisma } from "../../../db.config.js";
// 유저 생성
export const addUser = async (data) => {
    const exists = await prisma.user.findFirst({
        where: { email: data.email },
    });
    if (exists)
        return null;
    const created = await prisma.user.create({
        data,
    });
    return created.id;
};
// 유저 단건 조회
export const getUser = async (userId) => {
    return prisma.user.findFirstOrThrow({
        where: { id: userId },
    });
};
// 음식 카테고리 선호 설정
export const setPreference = async (userId, foodCategoryId) => {
    await prisma.userFavorCategory.create({
        data: {
            userId,
            foodCategoryId,
        },
    });
};
//유저 선호 카테고리 조회 (JOIN → include)
export const getUserPreferencesByUserId = async (userId) => {
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
//# sourceMappingURL=user.repository.js.map