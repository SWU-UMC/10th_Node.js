// src/modules/missions/services/mission.service.ts
import { insertMission, getUserMission, insertUserMission, findMissionsByStore, findUserMissions, completeUserMission, } from "../repositories/mission.repository.js";
export const createMissionService = async (data) => {
    return insertMission(data.storeId, data.condition, data.rewardPoint);
};
export const listStoreMissionsService = async (storeId) => {
    const missions = await findMissionsByStore(storeId);
    return {
        data: missions.map((m) => ({
            missionId: m.id,
            content: m.conditionText,
            reward: m.rewardPoint,
            store: {
                id: m.store.id,
                name: m.store.name,
            },
        })),
    };
};
export const challengeMissionService = async (userId, missionId) => {
    const exists = await getUserMission(userId, missionId);
    if (exists) {
        if (exists.status === "IN_PROGRESS") {
            throw new Error("이미 도전 중인 미션입니다.");
        }
        if (exists.status === "COMPLETED") {
            throw new Error("이미 완료한 미션입니다.");
        }
    }
    const created = await insertUserMission(userId, missionId);
    return {
        userMissionId: created.id,
        status: "IN_PROGRESS",
    };
};
export const listMyMissionsService = async (userId, status) => {
    const missions = await findUserMissions(userId, status);
    return missions.map((um) => ({
        id: um.id,
        status: um.status.toLowerCase(),
        mission: {
            id: um.mission.id,
            content: um.mission.conditionText,
            reward: um.mission.rewardPoint,
            deadline: null,
            store: {
                id: um.mission.store.id,
                name: um.mission.store.name,
            },
        },
    }));
};
export const completeMissionService = async (userMissionId) => {
    await completeUserMission(userMissionId);
    return { success: true };
};
//# sourceMappingURL=mission.service.js.map