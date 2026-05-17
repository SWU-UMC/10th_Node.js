import { Body, Controller, Post, Route, Tags } from "tsoa";
import { createMission } from "../services/mission.service.js";
import { createMissionRequest } from "../dtos/mission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post() // 가게에 미션 추가
  public async handleCreateMission(
    @Body() body: createMissionRequest,
  ): Promise<ApiResponse<any>> {
    const mission = await createMission(body as createMissionRequest);
    return success(mission);
  }
}
