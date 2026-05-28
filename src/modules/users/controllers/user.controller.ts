import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Patch,
  Request,
  Response,
  Route,
  Tags,
  Query,
  Path,
} from "tsoa";
import {
  AuthenticatedUser,
  UserSignUpRequest,
  UserSignUpResponse,
  ChangeUser,
} from "../dtos/user.dto.js";
import {
  userSignUp,
  getMyReviews,
  updateUser,
} from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import {
  createMemberMission,
  getMyMissions,
  successMission,
} from "../../missions/services/mission.service.js";
import passport from "passport";

const isLogin = passport.authenticate("jwt", { session: false });

@Route("users") // 라우트 경로
@Tags("Users") // Swagger 태그
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup") // 엔드포인트 정의
  @Response<ApiResponse<UserSignUpResponse>>(200, " 회원가입 성공")
  @Response<ApiResponse<null>>(400, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    const user = await userSignUp(body); // 서비스 로직 호출
    return success(user); // 성공 응답 보내기
  }
  @Get("guest")
  public async handleGuestPage(): Promise<String> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
      `;
  }
  @Get("login")
  public async handleLoginPage(): Promise<String> {
    return `<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>`;
  }
  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<String> {
    return `<h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>`;
  }
  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<String> {
    req.res!.cookie("username", "UMC10th", { maxAge: 360000 });
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }
  @Get("set-logout")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<String> {
    req.res!.clearCookie("username");
    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }
  /** 내가 작성한 리뷰들 조회
   * @summary 내가 작성한 리뷰를 조회할 수 있습니다.
   */
  @Get("reviews")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "내 리뷰 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleGetMyReviews(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Request() req: any,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const reviews = await getMyReviews(userId, { page, limit });
    return success(reviews);
  }
  /** 가게의 미션을 도전 중인 미션에 추가하기
   * @summary 가게의 미션을 도전 중인 미션에 추가합니다.
   */
  @Post("missions/{missionId}")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "미션을 도전 중인 미션에 추가 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 미션")
  public async handleMemberMission(
    @Path() missionId: number,
    @Request() req: any,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const memberMission = await createMemberMission(userId, missionId);
    return success(memberMission);
  }
  /** 내가 진행 중인 미션 조회
   * @summary 내가 진행 중인 미션을 조회합니다.
   */
  @Get("missions")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "내 진행 미션 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleGetMyMissions(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Request() req: any,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const missions = await getMyMissions(userId, { page, limit });
    return success(missions);
  }
  /** 미션 진행 완료로 바꾸기
   * @summary 미션을 진행 완료로 바꿉니다.
   */
  @Get("missions/{missionId}/success")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "미션 완료 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 미션")
  public async handleSuccessMission(
    @Path() missionId: number,
    @Request() req: any,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const mission = await successMission(userId, missionId);
    return success(mission);
  }
  /** 회원 정보 수정하기
   * @summary name, gender, birth, address, phoneNum 수정이 가능합니다.
   */
  @Patch("/mypage")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "회원 정보 수정 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleUpdateUser(
    @Request() req: any,
    @Body() body: ChangeUser,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const changedUser = await updateUser(userId, body);
    return success(changedUser);
  }
}
