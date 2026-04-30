import { insertStore } from "../repositories/store.repository";

export const createStoreService = async (data: any) => {
  return await insertStore(data);
};