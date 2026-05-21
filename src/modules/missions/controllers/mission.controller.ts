import { Body, Controller, Response, Post, Route, Tags, Res } from "tsoa";
import { createMission } from "../services/mission.service.js";
import { createMissionRequest } from "../dtos/mission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /** 가게에 미션 추가
   * @summary 가게에 미션을 추가합니다.
   */
  @Post()
  @Response<ApiResponse<null>>(200, "가게에 미션 추가 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleCreateMission(
    @Body() body: createMissionRequest,
  ): Promise<ApiResponse<any>> {
    const mission = await createMission(body as createMissionRequest);
    return success(mission);
  }
}
