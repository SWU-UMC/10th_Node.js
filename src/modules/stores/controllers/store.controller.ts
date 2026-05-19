import { listStoreReviews } from "../services/store.service.js";
import { Controller, Get, Path, Query, Response, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import * as missionService from "../../missions/services/mission.service.js";
import { ReviewListResponse } from "../dtos/store.dto.js";
import { StoreMissionItem } from "../../missions/dtos/mission.dtos.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 가게 리뷰 목록 조회 API
   * @summary 가게 ID와 커서를 기준으로 리뷰 목록을 조회합니다.
   * @param storeId 리뷰를 조회할 가게 ID
   * @param cursor 조회를 시작할 리뷰 ID 커서. 기본값은 0입니다.
   */
  @Get("{storeId}/reviews")
  @Response<ApiResponse<ReviewListResponse>>(200, "가게 리뷰 목록 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<ReviewListResponse>> {
    const result = await listStoreReviews(storeId, cursor);

    return success(result);
  }

  /**
   * 가게 미션 목록 조회 API
   * @summary 가게 ID와 커서를 기준으로 미션 목록을 조회합니다.
   * @param storeId 미션을 조회할 가게 ID
   * @param cursor 조회를 시작할 미션 ID 커서. 기본값은 0입니다.
   */
  @Get("{storeId}/missions")
  @Response<ApiResponse<StoreMissionItem[]>>(200, "가게 미션 목록 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleListStoreMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<StoreMissionItem[]>> {
    const result = await missionService.listStoreMissions(storeId, cursor);

    return success(result);
  }
}
