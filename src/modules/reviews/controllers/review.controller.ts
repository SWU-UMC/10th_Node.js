import {
  Body,
  Controller,
  Path,
  Get,
  Request,
  Response,
  Middlewares,
  Post,
  Route,
  Tags,
  Query,
} from "tsoa";
import { createReview, getStoreReviews } from "../services/review.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { AuthenticatedUser } from "../../users/dtos/user.dto.js";
import passport from "passport";

const isLogin = passport.authenticate("jwt", { session: false });

@Route("stores")
@Tags("Reviews")
export class ReviewController extends Controller {
  /** 가게에 리뷰 작성
   * @summary 가게에 리뷰를 작성합니다.
   */
  @Post("{storeId}/review")
  @Middlewares(isLogin)
  @Response<ApiResponse<null>>(200, "가게에 리뷰 작성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleCreateReview(
    @Path() storeId: number,
    @Body() body: any,
    @Request() req: any,
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as AuthenticatedUser).id;
    const review = await createReview(userId, storeId, body);
    return success(review);
  }
  /** 가게의 리뷰들 조회
   * @summary 가게의 리뷰들을 조회합니다.
   */
  @Get("{storeId}/reviews")
  @Response<ApiResponse<null>>(200, "가게 리뷰 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleGetStoreReviews(
    @Path() storeId: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ): Promise<ApiResponse<any>> {
    const reviews = await getStoreReviews(storeId, { page, limit });
    return success(reviews);
  }
}
