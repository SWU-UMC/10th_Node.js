export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 이름 */
  name: string;
  /** 성별 */
  gender: string;
  /** 생년월일 (예: 2000-01-01) */
  birth: string;
  /** 주소 */
  address?: string;
  /** 상세 주소 */
  detailAddress?: string;
  /** 전화번호 */
  phoneNumber: string;
  /** 비밀번호 */
  password: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

export interface UserSignUpResponse {
  /** 유저 이메일 */
  email: string;
  /** 유저 이름 */
  name: string;
  /** 유저가 선호하는 카테고리 이름 배열 */
  preferCategory: string[];
}

export interface UserProfileUpdateRequest {
  name: string;
  gender: string;
  birth: string;
  address: string;
  detailAddress?: string | null;
  phoneNumber: string;
  preferences?: number[];
}

export interface UserReviewListResponse {
  /** 리뷰 목록 */
  data: Array<{
    /** 리뷰 ID */
    id: number;
    /** 리뷰가 작성된 가게 */
    store: {
      /** 가게 ID */
      id: number;
      /** 가게 이름 */
      name: string;
    };
    /** 리뷰 작성자 */
    user: {
      /** 유저 ID */
      id: number;
      /** 유저 이메일 */
      email: string;
      /** 유저 이름 */
      name: string;
      /** 성별 */
      gender: string;
      /** 생년월일 */
      birth: Date;
      /** 주소 */
      address: string;
      /** 상세 주소 */
      detailAddress: string | null;
      /** 전화번호 */
      phoneNumber: string;
    };
    /** 리뷰 내용 */
    content: string;
  }>;
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 조회에 사용할 커서. 마지막 페이지면 null */
    cursor: number | null;
  };
}

export interface UserMissionListResponse {
  /** 유저가 도전 중인 미션 목록 */
  data: Array<{
    /** 유저 미션 ID */
    id: number;
    /** 미션 진행 상태 */
    status: string;
    /** 미션 정보 */
    mission: {
      /** 미션 ID */
      id: number;
      /** 미션 내용 */
      content: string;
      /** 미션 보상 포인트 */
      reward: number;
      /** 미션 마감일 */
      deadline: Date;
      /** 미션이 속한 가게 */
      store: {
        /** 가게 ID */
        id: number;
        /** 가게 이름 */
        name: string;
      };
    };
  }>;
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 조회에 사용할 커서. 마지막 페이지면 null */
    cursor: number | null;
  };
}

export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const bodyToUserProfileUpdate = (body: UserProfileUpdateRequest) => {
  const birth = new Date(body.birth);

  return {
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address,
    detailAddress: body.detailAddress ?? null,
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = (data: { user: any; preferences: any[] }): UserSignUpResponse => {
  const preferCategory = data.preferences.map((p) => p.foodCategory.name);

  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};
