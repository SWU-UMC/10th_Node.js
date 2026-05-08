// src/modules/missions/controllers/mission.controller.ts
import { Request, Response } from "express";
import {
  createMissionService,
  challengeMissionService,
  listStoreMissionsService,
  listMyMissionsService,
  completeMissionService,
} from "../services/mission.service.js";

export const createMission = async (
  req: Request,
  res: Response
) => {
  const { storeId, condition, rewardPoint } = req.body;

  const result = await createMissionService({
    storeId,
    condition,
    rewardPoint,
  });

  res.status(201).json({ success: true, data: result });
};

export const handleStoreMissions = async (
  req: Request<{ storeId: string }>,
  res: Response
) => {
  const storeId = Number(req.params.storeId);
  const result = await listStoreMissionsService(storeId);
  res.status(200).json(result);
};

export const challengeMission = async (
  req: Request<{ missionId: string }>,
  res: Response
) => {
  const missionId = Number(req.params.missionId);
  const userId = 1;
  const result = await challengeMissionService(userId, missionId);
  res.status(201).json({ success: true, data: result });
};

export const handleMyMissions = async (
  req: Request<{ userId: string }, any, any, { status?: string }>,
  res: Response
) => {
  const userId = Number(req.params.userId);
  const status = req.query.status;
  const result = await listMyMissionsService(userId, status);
  res.status(200).json(result);
};

export const completeMission = async (
  req: Request<{ userMissionId: string }>,
  res: Response
) => {
  const userMissionId = Number(req.params.userMissionId);
  const result = await completeMissionService(userMissionId);
  res.status(200).json(result);
};