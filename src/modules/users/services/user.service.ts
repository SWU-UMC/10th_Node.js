import bcrypt from "bcrypt";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";
import {
  bodyToUserProfileUpdate,
  UserProfileUpdateRequest,
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  replacePreferences,
  setPreference,
  updateUser,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferences.map((p) => p.foodCategory.name),
  };
};

export const updateMyProfile = async (
  userId: number,
  data: UserProfileUpdateRequest,
): Promise<UserSignUpResponse> => {
  const updateData = bodyToUserProfileUpdate(data);

  const user = await updateUser(userId, updateData);

  if (updateData.preferences !== undefined) {
    await replacePreferences(userId, updateData.preferences);
  }

  const preferences = await getUserPreferencesByUserId(userId);

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferences.map((p) => p.foodCategory.name),
  };
};
