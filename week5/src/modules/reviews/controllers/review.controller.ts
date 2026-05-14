import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToReview, ReviewAddRequest } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  // 가게에 리뷰 추가하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addReview(@Body() body: ReviewAddRequest): Promise<{ result: unknown }> {
    this.setStatus(201);
    const review = await reviewAdd(bodyToReview(body));
    return { result: review };
  }
}
