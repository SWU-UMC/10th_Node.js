// 미션 생성 요청
export interface createMissionRequest {
  title: string;
  body: string;
  reward: number;
}

// 미션 조회
export interface getMissionsQuery {
  page: number;
  limit: number;
}
