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
  Response as TsoaResponse
} from "tsoa";

import {
  listStoreReviews,
  createReviewService,
  listMyReviews,
} from "../services/review.service.js";

import { success, ApiResponse } from "../../../common/responses/response.js";
import { ErrorResponse } from "../../../common/dto/error.dto.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

  /**
   * 가게 리뷰 조회 API
   */
  @Get("stores/{storeId}")
  @TsoaResponse<ApiResponse<any>>(200, "리뷰 조회 성공")
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
  @TsoaResponse<ApiResponse<any>>(200, "내 리뷰 조회 성공")
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
  @TsoaResponse<ApiResponse<any>>(201, "리뷰 생성 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  public async createReview(
    @Path() storeId: number,
    @Body() body: { userId: number; content: string; rating: number }
  ): Promise<ApiResponse<any>> {

    const review = await createReviewService(storeId, body);
    return success(review);
  }
}