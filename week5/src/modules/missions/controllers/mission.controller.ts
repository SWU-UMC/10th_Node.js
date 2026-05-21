import { Controller, Route, Post, Body, Tags, SuccessResponse, Response } from "tsoa";
import { bodyToMission, MissionAddRequest, MissionAddResponse } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 추가 API
   * @summary 특정 가게에 미션을 추가합니다.
   */
  @Post()
  @SuccessResponse("201", "Created")
  @Response<ApiErrorResponse>(400, "Bad Request")
  @Response<ApiErrorResponse>(500, "Internal Server Error")
  public async addMission(@Body() body: MissionAddRequest): Promise<ApiResponse<MissionAddResponse>> {
    this.setStatus(201);
    const mission = await missionAdd(bodyToMission(body));
    return success(mission);
  }
}
