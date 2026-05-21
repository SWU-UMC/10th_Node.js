// 미션 생성 요청
export interface createMissionRequest {
  /** 미션 제목 */
  title: string;
  /** 미션 내용 */
  body: string;
  /** 미션 보상 */
  reward: number;
  /** 가게 ID */
  storeId: number;
}

// 미션 조회
export interface getMissionsQuery {
  page: number;
  limit: number;
}
