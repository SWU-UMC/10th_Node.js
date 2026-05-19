import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getStore,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";
import { AppError } from "../../../common/errors/app.error.js";

import bcrypt from "bcrypt";


export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
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

  return <UserSignUpResponse>{
    email: user.email,
    name: user.name,
    preferCategory: preferences.map((p) => p.foodCategory.name),
  };
};

