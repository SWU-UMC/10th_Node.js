import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createMission,
  createMemberMission,
} from "../services/mission.service.js";

// 미션 추가
export const handleCreateMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("미션을 추가하려합니다!");
  console.log("body: ", req.body);

  const storeId = 1;
  const mission = await createMission(storeId, req.body);

  res.status(StatusCodes.OK).json({ result: mission });
};

// 도전 중인 미션에 추가
export const handleMemberMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("도전 중인 미션에 추가하려합니다!");
  console.log("body: ", req.body);

  const userId = 4;
  const missionId = Number(req.params.missionId);
  const memberMission = await createMemberMission(userId, missionId);

  res.status(StatusCodes.OK).json({ result: memberMission });
};
