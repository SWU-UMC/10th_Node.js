import { createStoreService } from "../services/store.service.js";
export const createStore = async (req, res) => {
    const store = await createStoreService(req.body);
    res.status(201).json({ success: true, data: store });
};
//# sourceMappingURL=store.controller.js.map