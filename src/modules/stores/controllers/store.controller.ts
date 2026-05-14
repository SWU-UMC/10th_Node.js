import { listStoreReviews } from "../services/store.service.js";
import { Controller, Get, Path, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import * as missionService from "../../missions/services/mission.service.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Get("{storeId}/reviews")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<any>> {
    const result = await listStoreReviews(storeId, cursor);

    return success(result);
  }

  @Get("{storeId}/missions")
  public async handleListStoreMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<any>> {
    const result = await missionService.listStoreMissions(storeId, cursor);

    return success(result);
  }
}