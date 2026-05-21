import { Controller, Route, Post, Body, Tags, SuccessResponse, Response } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup")
  @SuccessResponse("200", "OK")
  @Response<ApiErrorResponse>(400, "Bad Request")
  @Response<ApiErrorResponse>(409, "Conflict - 이미 존재하는 이메일")
  @Response<ApiErrorResponse>(500, "Internal Server Error")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호웍
    return success(user); //성공 응답 보내기
  }
}