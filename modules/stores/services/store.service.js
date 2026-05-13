// src/modules/stores/services/store.service.ts
import { insertStore } from "../repositories/store.repository.js";
export const createStoreService = async (data) => {
    return insertStore(data);
};
//# sourceMappingURL=store.service.js.map