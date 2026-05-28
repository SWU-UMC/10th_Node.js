// src/modules/users/controllers/user.controller.ts
import {
  Body,
  Controller,
  Get,
  Patch,
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
  UserUpdateRequest,
} from "../dtos/user.dto.js";

import { userSignUp, updateUserService } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ErrorResponse } from "../../../common/dto/error.dto.js";
import passport from "passport";

const isLogin = passport.authenticate("jwt", { session: false });

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
    `;
  }

  @Get("set-login")
  public async handleSetLogin(
    @Request() req: ExpressRequest,
  ): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return `로그인 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>`;
  }

  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<string> {
    req.res!.clearCookie("username");
    return `로그아웃 완료 <a href="/api/v1/users/guest">메인으로 이동</a>`;
  }

  /**
   * 회원가입 API
   */
  @Post("signup")
  @TsoaResponse<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @TsoaResponse<ErrorResponse>(400, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    const user = await userSignUp(body);
    return success(user);
  }

  /**
   * 내 정보 수정 API
   */
  @Patch("me")
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(200, "정보 수정 성공")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  public async handleUpdateMe(
    @Request() req: ExpressRequest,
    @Body() body: UserUpdateRequest,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as any).id;
    const updated = await updateUserService(userId, body);
    return success(updated);
  }
}
