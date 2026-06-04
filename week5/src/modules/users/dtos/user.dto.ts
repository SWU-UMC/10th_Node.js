// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 이름 */
  name: string;
  /** 성별 (예: 'male', 'female') */
  gender: string;
  /** 생년월일 (예: '1999-01-01') */
  birth: string;
  /** 주소 (선택) */
  address?: string;
  /** 상세 주소 (선택) */
  detailAddress?: string;
  /** 전화번호 (예: '010-1234-5678') */
  phoneNumber: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

// 2. bodyToUser가 반환하는 내부 데이터 타입입니다.
export interface UserData {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  preferences: number[];
}

// 3. DB에서 조회한 데이터를 클라이언트 응답 형태로 변환해주는 함수입니다.
export const responseFromUser = ({
  user,
  preferences,
}: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detail_address,
    phoneNumber: user.phone_number,
    preferences: preferences.map((p) => ({
      id: p.id,
      foodCategoryId: p.food_category_id,
      name: p.name,
    })),
  };
};

// 4. 회원가입 응답 데이터 타입입니다.
export interface UserSignUpResponse {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  preferences: { id: number; foodCategoryId: number; name: string }[];
}

// 5. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest): UserData => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};