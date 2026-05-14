import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToUserMission, UserMissionAddRequest, UserMissionAddResponse } from "../dtos/user-mission.dto.js";
import { userMissionAdd } from "../services/user-mission.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("user-missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {
  // 미션 도전하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addUserMission(@Body() body: UserMissionAddRequest): Promise<ApiResponse<UserMissionAddResponse>> {
    this.setStatus(201);
    const userMission = await userMissionAdd(bodyToUserMission(body));
    return success(userMission);
  }
}
