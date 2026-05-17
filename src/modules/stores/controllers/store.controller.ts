import { Controller, Get, Route, Tags, Query, Path } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { getStoreMissions } from "../services/store.service.js";

@Route("stores") // 특정 가게의 미션 조회
@Tags("Stores")
export class StoreController extends Controller {
  @Get("{storeId}/missions")
  public async handleGetStoreMission(
    @Path() storeId: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ): Promise<ApiResponse<any>> {
    const missions = await getStoreMissions(storeId, { page, limit });
    return success(missions);
  }
}
