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
  Query,
  UseGuards
} from "@nestjs/common"
import { IitemRename, TemplateService } from "../service/template.service"
import { Template } from "../models/item.model"
import { JwtAuthGuard } from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("/api/items")
export default class TemplateControllers {
  constructor(private templateservice: TemplateService) { }

  @Post("")
  public async CreateItem(@Body() body: Template): Promise<Template> {
    try {
      return this.templateservice.create(body)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.CreateItem>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/")
  public async findAllForms(
    @Query("clientFk") clientFk: number
  ): Promise<Template[]> {
    try {
      return this.templateservice.findAll(clientFk)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.findAllForms>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  @Get("/:id")
  public async findCustomerById(
    @Param("id") id: string
  ): Promise<Template | null> {
    try {
      return this.templateservice.findOne(id)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.findCustomerById>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/:name/:id")
  public async templatebyCustomerId(
    @Param("id") id: number,
    @Param("name") name: string
  ): Promise<Template[]> {
    try {
      return this.templateservice.findOneTemplate(name, id)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.templatebyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/:id/:name")
  public async updateItem(
    @Param("id") id: string,
    @Param("name") name: string,
    @Body() body: Template
  ): Promise<[number | Template]> {
    try {
      return this.templateservice.updatetemp(+id, name, body)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.templatebyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/template/validate/:value")
  public async templateValidate(
    @Param("value") name: string
  ): Promise<Template[]> {
    try {
      return this.templateservice.validation(name)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.templatebyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Delete("/:id/:name/:schemaName")
  public async deleteTemplate(
    @Param("id") id: string,
    @Param("name") name: string,
    @Param("schemaName") schemaName: string
  ): Promise<string> {
    try {
      return this.templateservice.deleteItem(+id, name, schemaName)
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.templatebyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Put("/:id/:name/:menuId/:schemaName")
  public async alterTableName(
    @Param("id") id: string,
    @Param("name") name: string,
    @Param("schemaName") schemaName: string,
    @Body() body: IitemRename,
    @Param("menuId") menuId: string
  ): Promise<[number | IitemRename]> {
    try {
      return this.templateservice.alterTable(
        +id,
        name,
        schemaName,
        body,
        +menuId
      )
    } catch (e) {
      throw new HttpException(
        "Error in <itemControllers.templatebyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
