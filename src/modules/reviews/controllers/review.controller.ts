// src/modules/reviews/controllers/review.controller.ts
import {
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Path,
  Query,
  Body,
  Middlewares,
  Response as TsoaResponse
} from "tsoa";
import passport from "passport";

import {
  listStoreReviews,
  createReviewService,
  listMyReviews,
} from "../services/review.service.js";

import { success, ApiResponse } from "../../../common/responses/response.js";
import { ErrorResponse } from "../../../common/dto/error.dto.js";

const isLogin = passport.authenticate("jwt", { session: false });

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

  /**
   * 가게 리뷰 조회 API
   */
  @Get("stores/{storeId}")
  @TsoaResponse<ApiResponse<any>>(200, "리뷰 조회 성공")
  @TsoaResponse<ErrorResponse>(404, "가게를 찾을 수 없음")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const reviews = await listStoreReviews(storeId, cursor ?? 0);
    return success(reviews);
  }

  /**
   * 내 리뷰 조회 API
   */
  @Get("users/{userId}")
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(200, "내 리뷰 조회 성공")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  public async handleMyReviews(
    @Path() userId: number
  ): Promise<ApiResponse<any>> {
    const reviews = await listMyReviews(userId);
    return success(reviews);
  }

  /**
   * 리뷰 생성 API
   */
  @Post("{storeId}")
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(201, "리뷰 생성 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  public async createReview(
    @Path() storeId: number,
    @Body() body: { userId: number; content: string; rating: number }
  ): Promise<ApiResponse<any>> {
    const review = await createReviewService(storeId, body);
    return success(review);
  }
}