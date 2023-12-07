import {
  Controller,
  forwardRef,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseGuards
} from "@nestjs/common"
import { Support } from "../models/support.model"
import { JwtAuthGuard } from "../auth/gaurds/jwt-auth.gaurd"
import { SupportService } from "../service/support.service"

@UseGuards(JwtAuthGuard)
@Controller("api/support")
export default class SupportController {
  constructor(
    @Inject(forwardRef(() => SupportService))
    private supportService: SupportService
  ) { }

  @Get("/:title")
  public async getSupportByTitle(
    @Param("title") title: string
  ): Promise<Support | null> {
    try {
      return await this.supportService.getSupportByTitle(title)
    } catch (e) {
      throw new HttpException(
        "Error in SupportController.getSupportByTitle",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

}
