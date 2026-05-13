// src/modules/missions/repositories/mission.repository.ts
import { prisma } from "../../../db.config.js";
export const insertMission = async (storeId, condition, rewardPoint) => {
    const mission = await prisma.mission.create({
        data: {
            storeId,
            conditionText: condition,
            rewardPoint,
        },
    });
    return {
        id: mission.id,
        storeId: mission.storeId,
        condition: mission.conditionText,
        rewardPoint: mission.rewardPoint,
    };
};
export const findMissionsByStore = async (storeId) => {
    return prisma.mission.findMany({
        where: { storeId },
        include: {
            store: {
                select: { id: true, name: true },
            },
        },
        orderBy: { id: "asc" },
    });
};
export const getUserMission = async (userId, missionId) => {
    return prisma.userMission.findUnique({
        where: {
            userId_missionId: { userId, missionId },
        },
    });
};
export const insertUserMission = async (userId, missionId) => {
    return prisma.userMission.create({
        data: {
            userId,
            missionId,
            status: "IN_PROGRESS",
        },
    });
};
export const findUserMissions = async (userId, status) => {
    return prisma.userMission.findMany({
        where: {
            userId,
            ...(status ? { status } : {}),
        },
        include: {
            mission: {
                include: {
                    store: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: { id: "asc" },
    });
};
export const completeUserMission = async (userMissionId) => {
    return prisma.userMission.update({
        where: { id: userMissionId },
        data: { status: "COMPLETED" },
    });
};
//# sourceMappingURL=mission.repository.js.map