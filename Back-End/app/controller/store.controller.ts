import {StoreService} from "../service/store.service"
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common"
import {Store} from "../models/store.model"
import {JwtAuthGuard} from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("api/store")
export default class StoreController {
  constructor(private storeSevice: StoreService) {}
  @Post("/createStore")
  public async createStore(@Body() body: Store): Promise<Store> {
    try {
      return await this.storeSevice.create(body)
    } catch (e) {
      throw new HttpException(
        "Error in StoreController.createStore",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchStoreById/:storeId")
  public async fetchStoreById(
    @Param("storeId") storeId: string
  ): Promise<Store | null> {
    try {
      return await this.storeSevice.fetchStoreById(+storeId)
    } catch (e) {
      throw new HttpException(
        "Error in StoreController.fetchStoreById ",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchAllStoresByClientFK/:client_fk")
  public async fetchAllStoresByClientFK(
    @Param("client_fk") client_fk: string
  ): Promise<Store[]> {
    try {
      return await this.storeSevice.fetchAllStoresByClientFK(+client_fk)
    } catch (e) {
      throw new HttpException(
        "Error in StoreController.fetchAllStoresByClientFK",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete("/:storeId")
  public async storeDelete(@Param("storeId") storeId: string): Promise<string> {
    try {
      this.storeSevice.storeDelete(+storeId)
      return await "deleted"
    } catch (e) {
      throw new HttpException(
        "Error in StoreController.storeDelete",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/updateById/:storeId")
  public async updateStore(
    @Body() body: Store,
    @Param("storeId") storeId: string
  ): Promise<[number | Store]> {
    try {
      return await this.storeSevice.updateStore(body, +storeId)
    } catch (e) {
      throw new HttpException(
        "Error in StoreController.updateStore",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
