import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToMission, MissionAddRequest } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  // 가게에 미션 추가하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addMission(@Body() body: MissionAddRequest): Promise<{ result: unknown }> {
    this.setStatus(201);
    const mission = await missionAdd(bodyToMission(body));
    return { result: mission };
  }
}
