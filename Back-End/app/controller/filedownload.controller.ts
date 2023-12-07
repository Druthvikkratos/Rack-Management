import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common"
import {FileDownLoadService} from "../service/fileDownload.service"
import {File} from "../models/file.model"
import {JwtAuthGuard} from "../auth/gaurds/jwt-auth.gaurd"

@UseGuards(JwtAuthGuard)
@Controller("/api/file")
export default class FiledownloadControllers {
  constructor(private filedownloadservice: FileDownLoadService) {}

  @Post("/")
  public async CreateForm(@Body() body: File): Promise<File> {
    try {
      return await this.filedownloadservice.fileCreate(body)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.CreateForm>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Post("/trayfile")
  public async fileCreateTray(@Body() body: File): Promise<File> {
    try {
      return await this.filedownloadservice.fileCreateTray(body)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.fileCreateTray>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchFileById/:user_fk")
  public async findFilebyId(
    @Param("user_fk") user_fk: string
  ): Promise<File[]> {
    try {
      return await this.filedownloadservice.findOne(user_fk)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.findFilebyId>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/updateFile/:id")
  public async Updatefile(
    @Param("id") id: string,
    @Body() body: File
  ): Promise<void> {
    try {
      return await this.filedownloadservice.updateFile(+id, body)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.Updatefile>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/fetchTrayFile/:tray_fk")
  public async fetchTrayFile(@Param("tray_fk") tray_fk: number) {
    try {
     return await this.filedownloadservice.fetchTrayFile(tray_fk)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.Updatefile>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put("/updateTrayByFile/:tray_fk")
  public async updateTrayByFile(
    @Param("tray_fk") tray_fk: string,
    @Body() body: File
  ): Promise<File[]> {
    try {
      return await this.filedownloadservice.updateTrayByFile(+tray_fk, body)
    } catch (e) {
      throw new HttpException(
        "Error in <FiledownloadControllers.Updatefile>",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
