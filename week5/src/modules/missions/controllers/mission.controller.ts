import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, MissionAddRequest } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";

// 가게에 미션 추가하기
export const handleMissionAdd = async (req: Request, res: Response, next: NextFunction) => {
  const mission = await missionAdd(bodyToMission(req.body as MissionAddRequest));
  res.status(StatusCodes.CREATED).json({ result: mission });
};
