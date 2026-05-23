import assert from "node:assert/strict";
import test from "node:test";
import { bodyToUserProfileUpdate } from "../src/modules/users/dtos/user.dto.js";

test("bodyToUserProfileUpdate maps profile fields and converts birth to Date", () => {
  const result = bodyToUserProfileUpdate({
    name: "홍길동",
    gender: "남성",
    birth: "2000-01-01",
    address: "서울시 강남구",
    detailAddress: "101호",
    phoneNumber: "010-1234-5678",
    preferences: [1, 2],
  });

  assert.equal(result.name, "홍길동");
  assert.equal(result.gender, "남성");
  assert.equal(result.birth.toISOString(), "2000-01-01T00:00:00.000Z");
  assert.equal(result.address, "서울시 강남구");
  assert.equal(result.detailAddress, "101호");
  assert.equal(result.phoneNumber, "010-1234-5678");
  assert.deepEqual(result.preferences, [1, 2]);
});
