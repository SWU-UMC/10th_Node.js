import { Request, Response } from "express";
import { createStoreService } from "../services/store.service";

export const createStore = async (req: Request, res: Response) => {
  const store = await createStoreService(req.body);
  res.status(201).json({ success: true, data: store });
};