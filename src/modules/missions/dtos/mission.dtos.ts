export interface ChallengeMissionRequest {
  /** 도전할 미션 ID */
  missionId: number;
}

export interface CreateMissionRequest {
  /** 미션을 추가할 가게 ID */
  storeId: number;
  /** 미션 내용 */
  content: string;
  /** 미션 보상 포인트 */
  reward: number;
  /** 미션 마감일 (예: 2026-12-31) */
  deadline: string;
}

export interface StoreMissionItem {
  /** 미션 ID */
  id: number;
  /** 미션이 속한 가게 */
  store: {
    /** 가게 ID */
    id: number;
    /** 가게 이름 */
    name: string;
  };
  /** 미션 내용 */
  content: string;
  /** 미션 보상 포인트 */
  reward: number;
  /** 미션 마감일 */
  deadline: Date;
}
