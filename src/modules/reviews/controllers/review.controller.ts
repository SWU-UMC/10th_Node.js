import { addReview } from "../services/review.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import { CreateReviewRequest } from "../dtos/review.dto.js";


@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 작성 API
   * @summary 특정 가게에 리뷰를 작성합니다.
   */
  @Post()
  @Response<ApiResponse<null>>(200, "리뷰 작성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddReview(
    @Body() body: CreateReviewRequest
  ): Promise<ApiResponse<null>> {
    const userId = 2;

    await addReview(userId, body);

    return success(null);
  }
}
