import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createMission,
  createMemberMission,
  getMyMissions,
  successMission,
} from "../services/mission.service.js";
import { createMissionRequest } from "../dtos/mission.dto.js";

// 미션 추가
export const handleCreateMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("미션을 추가하려합니다!");
  console.log("body: ", req.body);

  const storeId = 1;
  const mission = await createMission(
    storeId,
    req.body as createMissionRequest,
  );

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

  const userId = 1;
  const missionId = Number(req.params.missionId);
  const memberMission = await createMemberMission(userId, missionId);

  res.status(StatusCodes.OK).json({ result: memberMission });
};

// 내가 진행 중인 미션 조회
export const handleGetMyMissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = 1;
  const query = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
  };
  const missions = await getMyMissions(userId, query);

  res.status(StatusCodes.OK).json({ result: missions });
};

// 미션 진행 완료로 바꾸기
export const handleSuccessMission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = 1;
  const missionId = Number(req.params.missionId);
  const mission = await successMission(userId, missionId);

  res.status(StatusCodes.OK).json({ result: mission });
};
