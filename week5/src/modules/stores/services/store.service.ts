import { bodyToStore, responseFromStore, StoreAddRequest } from "../dtos/store.dto.js";
import { addStore, getRegion, getStore } from "../repositories/store.repository.js";

export const storeAdd = async (data: ReturnType<typeof bodyToStore>) => {
  // 지역 존재 여부 확인
  const region = await getRegion(data.regionId);
  if (!region) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const storeId = await addStore({
    regionId: data.regionId,
    name: data.name,
    address: data.address,
  });

  const store = await getStore(storeId);
  return responseFromStore(store);
};
