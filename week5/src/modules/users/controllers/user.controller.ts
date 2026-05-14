import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Post("signup") // 엔드포인트 정의
  @SuccessResponse("200", "OK")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호웍
    return success(user); //성공 응답 보내기
  }
}