// 미션 추가 요청 타입
export interface MissionAddRequest {
  /** 미션 대상 가게 ID */
  storeId: number;
  /** 미션 달성 시 지급 포인트 */
  reward: number;
  /** 미션 마감일 (예: '2025-12-31') */
  deadline: string;
  /** 미션 내용 */
  missionSpec: string;
}

// bodyToMission: 요청 데이터를 내부 형식으로 변환
export const bodyToMission = (body: MissionAddRequest) => {
  return {
    storeId: body.storeId,
    reward: body.reward,
    deadline: new Date(body.deadline),
    missionSpec: body.missionSpec,
  };
};


export interface MissionAddResponse {
  /** 미션 ID */
  id: number;
  /** 미션 대상 가게 ID */
  storeId: number;
  /** 미션 달성 시 지급 포인트 */
  reward: number;
  /** 미션 마감일 */
  deadline: Date;
  /** 미션 내용 */
  missionSpec: string;
}

// responseFromMission: DB 결과를 응답 형식으로 변환
export const responseFromMission = (mission: any): MissionAddResponse => {
  return {
    id: mission.id,
    storeId: mission.store_id,
    reward: mission.reward,
    deadline: mission.deadline,
    missionSpec: mission.mission_spec,
  };
};
