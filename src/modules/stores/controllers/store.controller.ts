import { Controller, Response, Get, Route, Tags, Query, Path } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { getStoreMissions } from "../services/store.service.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  /** 특정 가게의 미션 조회
   * @summary 특정 가게의 미션을 조회합니다.
   */
  @Get("{storeId}/missions")
  @Response<ApiResponse<null>>(200, "특정 가게의 미션 조회 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleGetStoreMission(
    @Path() storeId: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ): Promise<ApiResponse<any>> {
    const missions = await getStoreMissions(storeId, { page, limit });
    return success(missions);
  }
}
