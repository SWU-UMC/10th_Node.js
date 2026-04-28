import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type { UserSignUpRequest } from "../dtos/user.dto.js";
import { addMission, addReview, challengeMission, userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트

    const user = await userSignUp(req.body as UserSignUpRequest);
    //성공 응답 보내기
    res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddReview = async (req: Request, res: Response) => {
  try {
    const userId = 2;
    const result = await addReview(userId, req.body);

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

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