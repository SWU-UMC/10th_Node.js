import { Request, Response } from "express";
import {
  createMissionService,
  challengeMissionService,
} from "../services/mission.service";

// 미션 생성
export const createMission = async (req: Request, res: Response) => {
  const { storeId, condition, rewardPoint } = req.body;

  const mission = await createMissionService({
    storeId,
    condition,
    rewardPoint,
  });

  res.status(201).json({
    success: true,
    data: mission,
  });
};

// 미션 도전
export const challengeMission = async (req: Request, res: Response) => {
  const missionId = Number(req.params.missionId);
  const userId = 1; // 특정 사용자(첫 번째 사용자)

  const result = await challengeMissionService(userId, missionId);

  res.status(201).json({
    success: true,
    data: result,
  });
};