import {Injectable, Logger} from "@nestjs/common"
import {UserService} from "../service/user.service"
import {JwtService} from "@nestjs/jwt"
import {ILoginPaylod} from "../service/user.service"
import crypto from "crypto"
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username, password)
    const hash = crypto.createHash("md5").update(password).digest("hex")
    password = hash
    if (user && user.password === password) {
      const {password, ...result} = user
      return result
    }
    return null
  }
  async login(user: ILoginPaylod) {
    return {
      access_token: this.jwtService.sign(user)
    }
  }
}
