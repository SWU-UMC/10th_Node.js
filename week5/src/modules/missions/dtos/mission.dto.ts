// 미션 추가 요청 타입
export interface MissionAddRequest {
  storeId: number;
  reward: number;
  deadline: string;
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

// responseFromMission: DB 결과를 응답 형식으로 변환
export const responseFromMission = (mission: any) => {
  return {
    id: mission.id,
    storeId: mission.store_id,
    reward: mission.reward,
    deadline: mission.deadline,
    missionSpec: mission.mission_spec,
  };
};
