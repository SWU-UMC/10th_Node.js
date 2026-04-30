// 미션 도전 요청 타입
export interface UserMissionAddRequest {
  userId: number;
  missionId: number;
}

// bodyToUserMission: 요청 데이터를 내부 형식으로 변환
export const bodyToUserMission = (body: UserMissionAddRequest) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

// responseFromUserMission: DB 결과를 응답 형식으로 변환
export const responseFromUserMission = (userMission: any) => {
  return {
    id: userMission.id,
    userId: userMission.user_id,
    missionId: userMission.mission_id,
    status: userMission.status,
    createdAt: userMission.created_at,
  };
};
