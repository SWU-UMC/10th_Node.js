// 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  phoneNum: string;
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {
  userId: number;
  preferCategory: string[];
}
