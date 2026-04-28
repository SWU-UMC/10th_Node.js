import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getStore,
  createReview,
  getUserMission,
  createUserMission,
  createMission,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";


export const userSignUp = async (data: UserSignUpRequest) => {
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
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);
  
  return responseFromUser({ user, preferences });
};


export const addReview = async (userId: number, data: any) => {
  const store = await getStore(data.storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await createReview(userId, data);
};

export const challengeMission = async (userId: number, missionId: number) => {
  const existing = await getUserMission(userId, missionId);

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  await createUserMission(userId, missionId);
};

export const addMission = async (data: any) => {
  const store = await getStore(data.storeId);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await createMission(data);
};