import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res
} from "@nestjs/common"
import {ContactUs, UserService} from "../service/user.service"
import {AuthService} from "./auth.service"
import {Plan} from "../models/plan.model"
import {User} from "../models/user.model"
import {Client} from "../models/client.model"
import { InjectModel } from "@nestjs/sequelize"
import {File} from "../models/file.model"
import { environment } from "../environment"
export interface ILoginPaylod {
  username: string
  password: string
  status: string
  trailend: Date
}

@Controller("api/user")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    @InjectModel(File)
    private fileModel: typeof File
  ) {}

  @Post("/client")
  public async createClient(@Body() body: Client): Promise<Client> {
    try {
      return await this.userService.createClient(body)
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.createClient",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  //Activation is part of registration before so i moved to auth controller
  @Get("/activation/:clientFk/:userPk")
  public async updateUserStatus(
    @Param("clientFk") clientid: string,
    @Param("userPk") userid: string
  ): Promise<User | [number]> {
    try {
      return await this.userService.updateUserStatus(+clientid, +userid)
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.updateUserStatus",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
  @Post("/")
  public async createUser(@Body() body: User): Promise<User> {
    try {
      return await this.userService.CreateUser(body)
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.createClient",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/client/validation/:value/:type")
  public async validation(
    @Param("value") value: string,
    @Param("type") type: string
  ): Promise<User[]> {
    try {
      return await this.userService.validation(value, type)
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.readUserFile",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get("/client/plans")
  public async findAllPlans(): Promise<Plan[]> {
    try {
      return await this.userService.findAllPlans()
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.findAllPlans",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Post("auth/login")
  async login(@Body() authLoginDto: ILoginPaylod) {
    return this.authService.login(authLoginDto)
  }

  @Get("/files/profile/:name")
  async downloadProfileImages(@Res() res, @Param("name") name) {
    await this.fileModel.findOne({
      where: {
        filename: name
      }
    })
    const filepath = environment.fileUploadFolderPath + "profile/" + name
    return res.download(filepath)
  }

  @Get("/files/profile/trayImages/:rackId/:trayId/:name")
  async downloadTrayImages(@Res() res, 
  @Param("name") name,
  @Param("rackId") rackId: string,
  @Param("trayId") trayId: string) {
    await this.fileModel.findOne({
      where: {
        filename: name
      }
    })
    const filepath = environment.fileUploadFolderPath +  "rack_"+ rackId +"/tray_"+ trayId + "/" + name
    return res.download(filepath)
  }

  @Post("/client/resetPassword")
  async forgotPassword(@Body() userData: User) {
    return this.userService.forgotpassword(userData)
  }

  @Post("/contactus")
  public async contactUs(@Body() body: ContactUs): Promise<void> {
    try {
      await this.userService.contactUs(body)
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.contactUs",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
