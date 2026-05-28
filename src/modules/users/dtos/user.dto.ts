// user.dto.ts
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}

export interface UserUpdateRequest {
  name?: string;
  gender?: string;
  birth?: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
}