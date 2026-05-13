import { createMissionService, challengeMissionService, listStoreMissionsService, listMyMissionsService, completeMissionService, } from "../services/mission.service.js";
export const createMission = async (req, res) => {
    const { storeId, condition, rewardPoint } = req.body;
    const result = await createMissionService({
        storeId,
        condition,
        rewardPoint,
    });
    res.status(201).json({ success: true, data: result });
};
export const handleStoreMissions = async (req, res) => {
    const storeId = Number(req.params.storeId);
    const result = await listStoreMissionsService(storeId);
    res.status(200).json(result);
};
export const challengeMission = async (req, res) => {
    const missionId = Number(req.params.missionId);
    const userId = 1;
    const result = await challengeMissionService(userId, missionId);
    res.status(201).json({ success: true, data: result });
};
export const handleMyMissions = async (req, res) => {
    const userId = Number(req.params.userId);
    const status = req.query.status;
    const result = await listMyMissionsService(userId, status);
    res.status(200).json(result);
};
export const completeMission = async (req, res) => {
    const userMissionId = Number(req.params.userMissionId);
    const result = await completeMissionService(userMissionId);
    res.status(200).json(result);
};
//# sourceMappingURL=mission.controller.js.map