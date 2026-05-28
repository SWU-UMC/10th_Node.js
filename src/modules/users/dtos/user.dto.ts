// 요청 DTO
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 이름 */
  name: string;
  /** 유저 성별 */
  gender: string;
  /** 유저 생일 */
  birth: Date;
  /** 주소 */
  address?: string;
  /** 휴대폰번호 */
  phoneNum: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {
  /** 유저 ID */
  userId: number;
  /** 선호하는 음식 카테고리 ID 배열 */
  preferCategory: string[];
}

// req.user
export interface AuthenticatedUser {
  /** 유저 ID */
  id: number;
  /** 유저 email */
  email: string;
  /** 유저 이름 */
  name: string;
}

export interface ChangeUser {
  /** 유저 이름 */
  name?: string;
  /** 유저 성별 */
  gender?: string;
  /** 유저 생일 */
  birth?: Date;
  /** 주소 */
  address?: string;
  /** 휴대폰번호 */
  phoneNum?: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences?: number[];
}
