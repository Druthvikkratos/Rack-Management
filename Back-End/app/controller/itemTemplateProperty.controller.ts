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
import {ItemTemplatePropertyService} from "../service/itemTemplateProperty.service"
import {ItemTemplateProperty} from "../models/itemTemplateProperty.model"
import {JwtAuthGuard} from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("/api/itemTemplateProperty")
export default class ItemTemplatePropertyController {
  constructor(
    private itemTemplatePropertyService: ItemTemplatePropertyService
  ) {}

  @Post("/")
  public async CreateItemTemplateProperty(
    @Body() body: ItemTemplateProperty
  ): Promise<ItemTemplateProperty> {
    try {
      return await this.itemTemplatePropertyService.create(body)
    } catch (e) {
      throw new HttpException(
        "Error in <ItemTemplatePropertyController.CreateItemTemplateProperty>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/")
  public async findAll(
    @Body() body: ItemTemplateProperty
  ): Promise<ItemTemplateProperty[]> {
    try {
      return await this.itemTemplatePropertyService.findAll(body)
    } catch (e) {
      throw new HttpException(
        "Error in <ItemTemplatePropertyController.findAll>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/:id")
  public async update(
    @Body() body: ItemTemplateProperty,
    @Param("id") id: string
  ): Promise<[number | ItemTemplateProperty]> {
    try {
      return await this.itemTemplatePropertyService.update(+id, body)
    } catch (e) {
      throw new HttpException(
        "Error in <ItemTemplatePropertyController.update>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete("/:id")
  public async deleteTempProp(@Param("id") id: string): Promise<string> {
    try {
      return await this.itemTemplatePropertyService.deleteTempProp(+id)
    } catch (e) {
      throw new HttpException(
        "Error in <ItemTemplatePropertyController.deleteTempProp>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
