import { Request, Response } from "express";
import { addMission, challengeMission } from "../services/mission.service.js";
import * as missionService from "../services/mission.service.js";

export const handleChallengeMission = async (req: Request, res: Response) => {
  try {
    const userId = 2;
    const { missionId } = req.body;

    await challengeMission(userId, missionId);

    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const handleAddMission = async (req: Request, res: Response) => {
  try {
    await addMission(req.body);

    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const handleListStoreMissions = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);

    const cursor =
      typeof req.query.cursor === "string"
        ? Number(req.query.cursor)
        : 0;

    const result = await missionService.listStoreMissions(storeId, cursor);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleListUserMissions = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const cursor =
      typeof req.query.cursor === "string"
        ? Number(req.query.cursor)
        : 0;

    const result = await missionService.listUserMissions(userId, cursor);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};