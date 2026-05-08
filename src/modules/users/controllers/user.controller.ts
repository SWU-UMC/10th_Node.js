// src/modules/users/controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    const user = await userSignUp(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
