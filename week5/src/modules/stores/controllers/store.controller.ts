import { Controller, Route, Post, Body, Tags, SuccessResponse } from "tsoa";
import { bodyToStore, StoreAddRequest } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {
  // 특정 지역에 가게 추가하기
  @Post()
  @SuccessResponse("201", "Created")
  public async addStore(@Body() body: StoreAddRequest): Promise<{ result: unknown }> {
    this.setStatus(201);
    const store = await storeAdd(bodyToStore(body));
    return { result: store };
  }
}
