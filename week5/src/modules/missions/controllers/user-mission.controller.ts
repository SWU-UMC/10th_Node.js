import { Controller, Route, Post, Body, Tags, SuccessResponse, Response } from "tsoa";
import { bodyToUserMission, UserMissionAddRequest, UserMissionAddResponse } from "../dtos/user-mission.dto.js";
import { userMissionAdd } from "../services/user-mission.service.js";
import { ApiResponse, ApiErrorResponse, success } from "../../../common/responses/response.js";

@Route("user-missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 사용자가 특정 미션에 도전합니다.
   */
  @Post()
  @SuccessResponse("201", "Created")
  @Response<ApiErrorResponse>(400, "Bad Request")
  @Response<ApiErrorResponse>(500, "Internal Server Error")
  public async addUserMission(@Body() body: UserMissionAddRequest): Promise<ApiResponse<UserMissionAddResponse>> {
    this.setStatus(201);
    const userMission = await userMissionAdd(bodyToUserMission(body));
    return success(userMission);
  }
}
