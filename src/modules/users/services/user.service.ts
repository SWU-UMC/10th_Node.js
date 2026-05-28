// user.service.ts
import { UserSignUpRequest, UserSignUpResponse, UserUpdateRequest } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";

export const userSignUp = async (
  data: UserSignUpRequest
): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const userId = user.id;
  const preferences = (
    await getUserPreferencesByUserId(joinUserId)
  ).map((obj: any) => obj.foodCategory.name);

  return {
    userId,
    preferences,
  };
};

export const updateUserService = async (
  userId: number,
  data: UserUpdateRequest
) => {
  const updated = await updateUser(userId, {
    ...data,
    birth: data.birth ? new Date(data.birth) : undefined,
  });

  return {
    userId: updated.id,
    email: updated.email,
    name: updated.name,
    phoneNumber: updated.phoneNumber,
  };
};