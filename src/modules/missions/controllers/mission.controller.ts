// src/modules/missions/controllers/mission.controller.ts
import {
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Path,
  Query,
  Body,
  Response as TsoaResponse
} from "tsoa";

import {
  createMissionService,
  challengeMissionService,
  listStoreMissionsService,
  listMyMissionsService,
  completeMissionService,
} from "../services/mission.service.js";

import { ApiResponse, success } from "../../../common/responses/response.js";
import { ErrorResponse } from "../../../common/dto/error.dto.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {

  /**
   * 미션 생성 API
   */
  @Post()
  @TsoaResponse<ApiResponse<any>>(201, "미션 생성 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  public async createMission(
    @Body() body: { storeId: number; condition: string; rewardPoint: number }
  ): Promise<ApiResponse<any>> {

    const result = await createMissionService(body);
    return success(result);
  }

  /**
   * 가게 미션 조회 API
   */
  @Get("stores/{storeId}")
  @TsoaResponse<ApiResponse<any>>(200, "미션 조회 성공")
  public async handleStoreMissions(
    @Path() storeId: number
  ): Promise<ApiResponse<any>> {

    const result = await listStoreMissionsService(storeId);
    return success(result);
  }

  /**
   * 미션 도전 API
   */
  @Post("{missionId}/challenge")
  @TsoaResponse<ApiResponse<any>>(201, "도전 성공")
  @TsoaResponse<ErrorResponse>(400, "이미 진행 중/완료")
  public async challengeMission(
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {

    const result = await challengeMissionService(1, missionId);
    return success(result);
  }

  /**
   * 내 미션 조회 API
   */
  @Get("users/{userId}")
  @TsoaResponse<ApiResponse<any>>(200, "내 미션 조회 성공")
  public async handleMyMissions(
    @Path() userId: number,
    @Query() status?: string
  ): Promise<ApiResponse<any>> {

    const result = await listMyMissionsService(userId, status);
    return success(result);
  }

  /**
   * 미션 완료 API
   */
  @Post("complete/{userMissionId}")
  @TsoaResponse<ApiResponse<any>>(200, "미션 완료 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  public async completeMission(
    @Path() userMissionId: number
  ): Promise<ApiResponse<any>> {

    const result = await completeMissionService(userMissionId);
    return success(result);
  }
}