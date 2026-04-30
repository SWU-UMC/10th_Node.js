// 가게 추가 요청 타입
export interface StoreAddRequest {
  regionId: number;
  name: string;
  address?: string;
}

// bodyToStore: 요청 데이터를 내부 형식으로 변환
export const bodyToStore = (body: StoreAddRequest) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address || "",
  };
};

// responseFromStore: DB 결과를 응답 형식으로 변환
export const responseFromStore = (store: any) => {
  return {
    id: store.id,
    regionId: store.region_id,
    name: store.name,
    address: store.address,
    score: store.score,
  };
};
