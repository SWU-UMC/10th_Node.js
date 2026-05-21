// 미션 도전 요청 타입
export interface UserMissionAddRequest {
  /** 도전하는 유저 ID */
  userId: number;
  /** 도전할 미션 ID */
  missionId: number;
}

// bodyToUserMission: 요청 데이터를 내부 형식으로 변환
export const bodyToUserMission = (body: UserMissionAddRequest) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

// 미션 도전 응답 타입
export interface UserMissionAddResponse {
  /** 유저 미션 ID */
  id: number;
  /** 유저 ID */
  userId: number;
  /** 미션 ID */
  missionId: number;
  /** 미션 진행 상태 (예: 'in_progress', 'complete') */
  status: string;
  /** 도전 시작일 */
  createdAt: Date;
}

// responseFromUserMission: DB 결과를 응답 형식으로 변환
export const responseFromUserMission = (userMission: any): UserMissionAddResponse => {
  return {
    id: userMission.id,
    userId: userMission.user_id,
    missionId: userMission.mission_id,
    status: userMission.status,
    createdAt: userMission.created_at,
  };
};
