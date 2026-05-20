// src/modules/stores/controllers/store.controller.ts
import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  Response as TsoaResponse
} from "tsoa";

import { createStoreService } from "../services/store.service.js";
import { ApiResponse } from "../../../common/responses/response.js";
import { ErrorResponse } from "../../../common/dto/error.dto.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {

  /**
   * 가게 생성 API
   */
  @Post()
  @TsoaResponse<ApiResponse<any>>(201, "가게 생성 성공")
  @TsoaResponse<ErrorResponse>(400, "요청 오류")
  public async createStore(
    @Body() body: any
  ): Promise<ApiResponse<any>> {

    const store = await createStoreService(body);

    return {
      resultType: "SUCCESS",
      error: null,
      data: store
    };
  }
}