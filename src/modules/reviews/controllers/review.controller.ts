import { addReview } from "../services/review.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";


@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Post()
  public async handleAddReview(
    @Body() body: any
  ): Promise<ApiResponse<null>> {
    const userId = 2;

    await addReview(userId, body);

    return success(null);
  }
}
