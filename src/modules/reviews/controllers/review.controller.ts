import { Request as ExpressRequest } from "express";
import passport from "passport";
import { Body, Controller, Middlewares, Post, Request, Response, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { addReview } from "../services/review.service.js";
import { CreateReviewRequest } from "../dtos/review.dto.js";

type AuthenticatedUser = {
  id: number;
};

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 작성 API
   * @summary 로그인한 사용자가 특정 가게에 리뷰를 작성합니다.
   */
  @Post()
  @Middlewares(passport.authenticate("jwt", { session: false }))
  @Response<ApiResponse<null>>(200, "리뷰 작성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(401, "인증 실패")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddReview(
    @Body() body: CreateReviewRequest,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<null>> {
    const userId = (req.user as AuthenticatedUser).id;

    await addReview(userId, body);

    return success(null);
  }
}
