import { Controller, Route, Post, Body, Tags, SuccessResponse, Response } from "tsoa";
import { bodyToReview, ReviewAddRequest, ReviewAddResponse } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 추가 API
   * @summary 특정 가게에 리뷰를 추가합니다.
   */
  @Post()
  @SuccessResponse("201", "Created")
  @Response<ApiErrorResponse>(400, "Bad Request")
  @Response<ApiErrorResponse>(500, "Internal Server Error")
  public async addReview(@Body() body: ReviewAddRequest): Promise<ApiResponse<ReviewAddResponse>> {
    this.setStatus(201);
    const review = await reviewAdd(bodyToReview(body));
    return success(review);
  }
}
