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
import {ItemTemplateService} from "../service/itemTemplate.service"
import {ItemTemplate} from "../models/itemTemplate.model"
import {JwtAuthGuard} from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("/api/itemTemplate")
export default class itemTemplateControllers {
  constructor(private itemTemplateService: ItemTemplateService) {}

  @Post("/")
  public async CreateStore(@Body() body: ItemTemplate): Promise<ItemTemplate> {
    try {
      return await this.itemTemplateService.create(body)
    } catch (e) {
      throw new HttpException(
        "Error in <itemTemplateControllers.CreateStore>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/")
  public async findAllForms(
    @Body() body: ItemTemplate
  ): Promise<ItemTemplate[]> {
    try {
      return await this.itemTemplateService.findAll(body)
    } catch (e) {
      throw new HttpException(
        "Error in <itemTemplateControllers.findAllForms>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/:id")
  public async updateById(
    @Body() body: ItemTemplate,
    @Param("id") id: string
  ): Promise<[number | ItemTemplate]> {
    try {
      return await this.itemTemplateService.update(body, +id)
    } catch (e) {
      throw new HttpException(
        "Error in <itemTemplateControllers.IitemTemplate>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete("/:id")
  public async deleteItemTemplate(@Param("id") id: string): Promise<string> {
    try {
      return await this.itemTemplateService.deleteItemTemplate(+id)
    } catch (e) {
      throw new HttpException(
        "Error in <itemTemplateControllers.updateById>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
