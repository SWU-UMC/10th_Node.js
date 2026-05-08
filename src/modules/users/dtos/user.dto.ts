// user.dto.ts
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

// 요청 → 내부 데이터 변환
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


// 회원가입 응답 DTO
export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}

// 내부 데이터 → 응답 데이터 변환
export const responseFromUser = (
  data: { user: any; preferences: any[] }
): UserSignUpResponse => {
  const preferCategory = data.preferences.map(
    (p) => p.foodCategory.name
  );

  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};
