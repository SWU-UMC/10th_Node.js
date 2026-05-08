// src/modules/stores/repositories/store.repository.ts
import { prisma } from "../../../db.config.js";

export const insertStore = async (data: any) => {
  return prisma.store.create({ data });
};
