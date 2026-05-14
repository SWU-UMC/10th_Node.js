import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToUser, UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  // 회원가입
  @Post("signup")
  @SuccessResponse("200", "OK")
  public async signUp(@Body() body: UserSignUpRequest): Promise<{ result: unknown }> {
    console.log("회원가입을 요청했습니다!");
    const user = await userSignUp(bodyToUser(body));
    return { result: user };
  }
}