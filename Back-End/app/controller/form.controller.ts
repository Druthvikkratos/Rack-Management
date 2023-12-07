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
import {
  FormService,
  IFindItemsOnTray,
  IFormCreate,
  LowerAndUpper
} from "../service/form.service"
import { Template } from "../models/item.model"
import { JwtAuthGuard } from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("/api/form")
export default class formControllers {
  constructor(private formservice: FormService) { }

  @Post("/:schemaName/")
  public async createForm(
    @Body() body: IFormCreate,
    @Query("tempName") tempName: string,
    @Param("schemaName") schemaName: string
  ) {
    try {
      return await this.formservice.CreateForm(body, tempName, schemaName)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findAllFormsbyTemplate>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/:schemaName")
  public async findAllFormsbyTemplate(
    @Query("itemTempId") itemTempId: string,
    @Query("formName") formName: string,
    @Param("schemaName") schemaName: string,
    @Query("page") page: number,
    @Query("size") size: number
  ): Promise<IFormCreate> {
    try {
      return await this.formservice.findItemsOnStore(
        itemTempId,
        formName,
        schemaName,
        page,
        size
      )
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findTemplatebyName>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  @Get("totalItems/:schemaName")
  public async findTotalItemsOnStore(
    @Query("itemTempId") itemTempId: string,
    @Query("formName") formName: string,
    @Param("schemaName") schemaName: string,
    
  ): Promise<IFormCreate> {
    try {
      return await this.formservice.findTotalItemsOnStore(
        itemTempId,
        formName,
        schemaName        
      )
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findTotalItemsOnStore>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchTrayProducts/:schemaName")
  public async findItemsOnTray(
    @Query("itemTempId") itemTempId: string,
    @Query("formName") formName: string,
    @Param("schemaName") schemaName: string,
    @Query("trayId") trayId: string
  ): Promise<IFindItemsOnTray> {
    try {
      return await this.formservice.findItemsOnTray(
        itemTempId,
        formName,
        schemaName,
        trayId
      )
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findProductsOnTray>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/:id/:name/:schemaName")
  public async formbyCustomerId(
    @Param("id") id: number,
    @Param("name") name: string,
    @Param("schemaName") schemaName: string
  ) {
    try {
      return await this.formservice.findOne(name, id, schemaName)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.formbyCustomerId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/:id/:name/:schemaName")
  public async Updateform(
    @Param("id") id: string,
    @Param("name") name: string,
    @Param("schemaName") schemaName: string,
    @Body() body: IFormCreate
  ) {
    try {
      return await this.formservice.update(+id, name, schemaName, body)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.Updateform>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete("/:id/:name/:schemaName")
  public async deleteform(
    @Param("id") id: string,
    @Param("name") name: string,
    @Param("schemaName") schemaName: string
  ) {
    try {
      return await this.formservice.deleteForm(id, name, schemaName)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.deleteform>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchAllTemplates/")
  public async findAllTemplates(): Promise<Template[]> {
    try {
      return await this.formservice.fetchAllTemplates()
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findAllTemplates>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete("/:name/:id/:schemaName")
  public async deleteFromTemplate(
    @Param("name") name: string,
    @Param("id") id: string,
    @Param("schemaName") schemaName: string
  ): Promise<string> {
    try {
      return await this.formservice.deleteFromTemplate(name, +id, schemaName)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.deleteFromTemplate>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Get("/:name")
  public async findTemplatebyName(
    @Param("name") name: string
  ): Promise<Template> {
    try {
      return await this.formservice.findTemplates(name)
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findTemplatebyName>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Get("/findByForm/:formId/")
  public async findLowerAndUpperLimit(
    @Param("formId") formId: string,
    @Query("trayId") trayId: string
  ): Promise<LowerAndUpper> {
    try {
      return await this.formservice.fetchUpperLowerAndNotification(
        formId,
        trayId
      )
    } catch (e) {
      throw new HttpException(
        "Error in <formControllers.findTemplatebyName>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
