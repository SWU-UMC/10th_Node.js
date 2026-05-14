import { addMission, challengeMission } from "../services/mission.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { Body, Controller, Post, Route, Tags } from "tsoa";


@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("challenge")
  public async handleChallengeMission(
    @Body() body: { missionId: number }
  ): Promise<ApiResponse<null>> {
    const userId = 2;

    await challengeMission(userId, body.missionId);

    return success(null);
  }

  @Post()
  public async handleAddMission(
    @Body() body: any
  ): Promise<ApiResponse<null>> {
    await addMission(body);

    return success(null);
  }
}
