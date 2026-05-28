import {
  UserSignUpRequest,
  UserSignUpResponse,
  ChangeUser,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllMyReviews,
  updateMe,
} from "../repositories/user.repository.js";
import { getReviewsQuery } from "../../reviews/dtos/review.dto.js";
import {
  DuplicateUserEmailError,
  UserNotFoundError,
} from "../../../common/errors/error.js";

// 회원가입
export const userSignUp = async (
  data: UserSignUpRequest,
): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환하여 넘겨줌
    address: data.address,
    phoneNum: data.phoneNum,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preferences of data.preferences) {
    await setPreference(joinUserId, preferences);
  }

  const user = await getUser(joinUserId);
  const userId = user!.id;
  const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
    (obj) => obj.foodCategory.name,
  );

  return <UserSignUpResponse>{
    userId,
    preferCategory: preferences,
  };
};

// 내가 작성한 리뷰 조회
export const getMyReviews = async (userId: number, query: getReviewsQuery) => {
  const reviews = await getAllMyReviews(userId, query);
  return reviews;
};

// 내 정보 수정
export const updateUser = async (userId: number, body: ChangeUser) => {
  const user = await getUser(userId);
  if (!user) {
    throw new UserNotFoundError("사용자를 찾을 수 없습니다.");
  }
  const changeUser = await updateMe(userId, body);
  return changeUser;
};
