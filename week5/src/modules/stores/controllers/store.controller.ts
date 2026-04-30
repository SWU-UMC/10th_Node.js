import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, StoreAddRequest } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

// 특정 지역에 가게 추가하기
export const handleStoreAdd = async (req: Request, res: Response, next: NextFunction) => {
  const store = await storeAdd(bodyToStore(req.body as StoreAddRequest));
  res.status(StatusCodes.CREATED).json({ result: store });
};
