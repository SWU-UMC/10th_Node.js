// src/modules/stores/controllers/store.controller.ts
import { Request, Response } from "express";
import { createStoreService } from "../services/store.service.js";

export const createStore = async (req: Request, res: Response) => {
  const store = await createStoreService(req.body);
  res.status(201).json({ success: true, data: store });
};
