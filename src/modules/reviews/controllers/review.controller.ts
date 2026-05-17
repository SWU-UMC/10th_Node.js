import {
  Body,
  Controller,
  Path,
  Get,
  Middlewares,
  Post,
  Request,
  Res,
  Route,
  Tags,
  Query,
} from "tsoa";
import { createReview, getStoreReviews } from "../services/review.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("reviews")
export class ReviewController extends Controller {
  @Post("{storeId}/review") // 가게에 리뷰 작성
  public async handleCreateReview(
    @Path() storeId: number,
    @Body() body: any,
  ): Promise<ApiResponse<any>> {
    const userId = 1;
    const review = await createReview(userId, storeId, body);
    return success(review);
  }
  @Get("{storeId}/reviews") // 가게의 리뷰들 조회
  public async handleGetStoreReviews(
    @Path() storeId: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ): Promise<ApiResponse<any>> {
    const reviews = await getStoreReviews(storeId, { page, limit });
    return success(reviews);
  }
}
