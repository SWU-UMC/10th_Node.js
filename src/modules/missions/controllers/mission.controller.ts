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
  Request,
  Middlewares,
  Response as TsoaResponse
} from "tsoa";
import { Request as ExpressRequest } from "express";
import passport from "passport";

import {
  createMissionService,
  challengeMissionService,
  listStoreMissionsService,
  listMyMissionsService,
  completeMissionService,
} from "../services/mission.service.js";

import { ApiResponse, success } from "../../../common/responses/response.js";
import { ErrorResponse } from "../../../common/dto/error.dto.js";

const isLogin = passport.authenticate("jwt", { session: false });

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {

  /**
   * 미션 생성 API
   */
  @Post()
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(201, "미션 생성 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
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
  @TsoaResponse<ErrorResponse>(404, "가게를 찾을 수 없음")
  @TsoaResponse<ErrorResponse>(500, "서버 오류")
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
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(201, "도전 성공")
  @TsoaResponse<ErrorResponse>(400, "이미 진행 중/완료")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  public async challengeMission(
    @Path() missionId: number,
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<any>> {
    const userId = (req.user as any).id;
    const result = await challengeMissionService(userId, missionId);
    return success(result);
  }

  /**
   * 내 미션 조회 API
   */
  @Get("users/{userId}")
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(200, "내 미션 조회 성공")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  @TsoaResponse<ErrorResponse>(403, "권한 없음")
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
  @Middlewares(isLogin)
  @TsoaResponse<ApiResponse<any>>(200, "미션 완료 성공")
  @TsoaResponse<ErrorResponse>(400, "잘못된 요청")
  @TsoaResponse<ErrorResponse>(401, "인증 필요")
  public async completeMission(
    @Path() userMissionId: number
  ): Promise<ApiResponse<any>> {
    const result = await completeMissionService(userMissionId);
    return success(result);
  }
}