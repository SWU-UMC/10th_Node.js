import { Controller, Route, Post, Body, Tags, SuccessResponse, Response } from "tsoa";
import { bodyToStore, StoreAddRequest, StoreAddResponse } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 가게 추가 API
   * @summary 특정 지역에 새로운 가게를 추가합니다.
   */
  @Post()
  @SuccessResponse("201", "Created")
  @Response<ApiErrorResponse>(400, "Bad Request")
  @Response<ApiErrorResponse>(500, "Internal Server Error")
  public async addStore(@Body() body: StoreAddRequest): Promise<ApiResponse<StoreAddResponse>> {
    this.setStatus(201);
    const store = await storeAdd(bodyToStore(body));
    return success(store);
  }
}
