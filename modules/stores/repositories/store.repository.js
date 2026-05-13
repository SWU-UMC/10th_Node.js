// src/modules/stores/repositories/store.repository.ts
import { prisma } from "../../../db.config.js";
export const insertStore = async (data) => {
    return prisma.store.create({ data });
};
//# sourceMappingURL=store.repository.js.map