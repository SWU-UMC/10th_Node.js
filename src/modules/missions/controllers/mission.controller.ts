import { addMission, challengeMission } from "../services/mission.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import {
  ChallengeMissionRequest,
  CreateMissionRequest,
} from "../dtos/mission.dtos.js";


@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 유저가 특정 미션에 도전합니다.
   */
  @Post("challenge")
  @Response<ApiResponse<null>>(200, "미션 도전 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(409, "이미 도전 중인 미션")
  public async handleChallengeMission(
    @Body() body: ChallengeMissionRequest
  ): Promise<ApiResponse<null>> {
    const userId = 2;

    await challengeMission(userId, body.missionId);

    return success(null);
  }

  /**
   * 미션 생성 API
   * @summary 특정 가게에 새로운 미션을 추가합니다.
   */
  @Post()
  @Response<ApiResponse<null>>(200, "미션 생성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddMission(
    @Body() body: CreateMissionRequest
  ): Promise<ApiResponse<null>> {
    await addMission(body);

    return success(null);
  }
}
