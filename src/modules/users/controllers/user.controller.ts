// src/modules/users/controllers/user.controller.ts
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Route,
  Tags,
  Response as TsoaResponse
} from "tsoa";

import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";

import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";

// 공통 ErrorResponse 사용
import { ErrorResponse } from "../../../common/dto/error.dto.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {

  @Get("guest")
  public async handleGuestPage(): Promise<string> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
    `;
  }

  @Get("login")
  public async handleLoginPage(): Promise<string> {
    return `
      <h1>로그인 페이지</h1>
      <p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>
    `;
  }

  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(
    @Request() req: ExpressRequest,
  ): Promise<string> {
    return `
      <h1>마이페이지</h1>
      <p>환영합니다, ${req.cookies.username}님!</p>
      <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `;
  }

  @Get("set-login")
  public async handleSetLogin(
    @Request() req: ExpressRequest,
  ): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });

    return `
      로그인 완료! 
      <a href="/api/v1/users/mypage">마이페이지로 이동</a>
    `;
  }

  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<string> {
    req.res!.clearCookie("username");

    return `
      로그아웃 완료 
      <a href="/api/v1/users/guest">메인으로 이동</a>
    `;
  }

  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup")
  @TsoaResponse<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @TsoaResponse<ErrorResponse>(400, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {

    console.log("회원가입 요청");
    console.log("body:", body);

    const user = await userSignUp(body);

    return success(user);
  }
}