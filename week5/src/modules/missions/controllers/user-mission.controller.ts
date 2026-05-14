import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToUserMission, UserMissionAddRequest } from "../dtos/user-mission.dto.js";
import { userMissionAdd } from "../services/user-mission.service.js";

@Route("user-missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {
  // 미션 도전하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addUserMission(@Body() body: UserMissionAddRequest): Promise<{ result: unknown }> {
    this.setStatus(201);
    const userMission = await userMissionAdd(bodyToUserMission(body));
    return { result: userMission };
  }
}
