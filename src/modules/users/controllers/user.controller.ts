import {
  Body,
  Controller,
  Get,
  Middlewares,
  Patch,
  Path,
  Post,
  Query,
  Request,
  Response,
  Route,
  Tags,
} from "tsoa";
import { Request as ExpressRequest } from "express";
import passport from "passport";
import {
  UserMissionListResponse,
  UserProfileUpdateRequest,
  UserReviewListResponse,
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto";
import { updateMyProfile, userSignUp } from "../services/user.service";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { ApiResponse, success } from "../../../common/responses/response";
import * as reviewService from "../../reviews/services/review.service.js";
import * as missionService from "../../missions/services/mission.service.js";

type AuthenticatedUser = {
  id: number;
};

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup")
  @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(409, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    const user = await userSignUp(body);

    return success(user);
  }

  /**
   * 내 정보 수정 API
   * @summary 로그인한 사용자의 부족한 프로필 정보를 수정합니다.
   */
  @Patch("me")
  @Middlewares(passport.authenticate("jwt", { session: false }))
  @Response<ApiResponse<UserSignUpResponse>>(200, "내 정보 수정 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(401, "인증 실패")
  public async handleUpdateMyProfile(
    @Body() body: UserProfileUpdateRequest,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    const userId = (req.user as AuthenticatedUser).id;
    const user = await updateMyProfile(userId, body);

    return success(user);
  }

  /**
   * 게스트 페이지 조회 API
   * @summary 로그인 없이 접근 가능한 게스트 페이지를 반환합니다.
   */
  @Get("guest")
  @Response<string>(200, "게스트 페이지 조회 성공")
  public async handleGuestPage(): Promise<string> {
    return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
  }

  /**
   * 로그인 페이지 조회 API
   * @summary 로그인이 필요한 경우 안내할 로그인 페이지를 반환합니다.
   */
  @Get("login")
  @Response<string>(200, "로그인 페이지 조회 성공")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 여기로 옵니다.</p>";
  }

  /**
   * 마이페이지 조회 API
   * @summary 로그인한 유저만 접근 가능한 마이페이지를 반환합니다.
   */
  @Get("mypage")
  @Response<string>(200, "마이페이지 조회 성공")
  @Response<ApiResponse<null>>(401, "인증 실패")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }

  /**
   * 로그인 쿠키 설정 API
   * @summary 테스트용 로그인 쿠키를 생성합니다.
   */
  @Get("set-login")
  @Response<string>(200, "로그인 쿠키 생성 성공")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });

    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }

  /**
   * 로그아웃 쿠키 삭제 API
   * @summary 테스트용 로그인 쿠키를 삭제합니다.
   */
  @Get("set-logout")
  @Response<string>(200, "로그아웃 성공")
  public async handleSetLogout(@Request() req: ExpressRequest): Promise<string> {
    req.res!.clearCookie("username");

    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }

  /**
   * 유저 리뷰 목록 조회 API
   * @summary 유저 ID와 커서를 기준으로 유저가 작성한 리뷰 목록을 조회합니다.
   * @param userId 리뷰를 조회할 유저 ID
   * @param cursor 조회를 시작할 리뷰 ID 커서. 기본값은 0입니다.
   */
  @Get("{userId}/reviews")
  @Response<ApiResponse<UserReviewListResponse>>(200, "유저 리뷰 목록 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleListUserReviews(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<UserReviewListResponse>> {
    const result = await reviewService.listUserReviews(userId, cursor);

    return success(result);
  }

  /**
   * 유저 미션 목록 조회 API
   * @summary 유저 ID와 커서를 기준으로 유저가 도전 중인 미션 목록을 조회합니다.
   * @param userId 미션을 조회할 유저 ID
   * @param cursor 조회를 시작할 유저 미션 ID 커서. 기본값은 0입니다.
   */
  @Get("{userId}/missions")
  @Response<ApiResponse<UserMissionListResponse>>(200, "유저 미션 목록 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleListUserMissions(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<UserMissionListResponse>> {
    const result = await missionService.listUserMissions(userId, cursor);

    return success(result);
  }
}
