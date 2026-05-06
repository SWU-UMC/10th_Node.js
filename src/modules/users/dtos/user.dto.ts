// 1. 회원가입 요청 데이터의 설계도
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  phoneNum: string;
  preferences: number[];
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    phoneNum: body.phoneNum,
    preferences: body.preferences,
  };
};

// 저장되는 유저 형태
export interface User {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  phoneNum: string;
  preferences: number[];
}

export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}
export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferCategory = data.preferences.map((p) => p.foodCategory.name);

  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};
