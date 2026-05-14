import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToMission, MissionAddRequest, MissionAddResponse } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  // 가게에 미션 추가하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addMission(@Body() body: MissionAddRequest): Promise<ApiResponse<MissionAddResponse>> {
    this.setStatus(201);
    const mission = await missionAdd(bodyToMission(body));
    return success(mission);
  }
}
