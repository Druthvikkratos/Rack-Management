import {QueryTypes} from "sequelize"
import {sequelizeConfig} from "../config/seq.config"
import crypto from "crypto"
import {UserNotification} from "../middleware/userNotification"
import {UserProfile} from "../models/userProfile.model"
import {forwardRef, Inject, Injectable, Logger} from "@nestjs/common"
import {InjectModel} from "@nestjs/sequelize"
import {Notification} from "../models/notification.model"
@Injectable()
export class UserProfilesService {
  constructor(
    @InjectModel(UserProfile)
    private userProfileModel: typeof UserProfile,
    @Inject(forwardRef(() => UserNotification))
    private userNotification: UserNotification
  ) {}
  public async updateProfile(
    payload: UserProfile,
    profileId: number
  ): Promise<[number | UserProfile]> {
    Logger.log("Start of UserProfilesService : updateProfile :id", profileId)
    const id = profileId
    const updateProfile = await this.userProfileModel.update(payload, {
      where: {id: id}
    })
    Logger.log(
      "End of UserProfilesService : updateProfile : updated " + updateProfile
    )
    return updateProfile
  }

  public async fetchProfileById(id: number): Promise<UserProfile | null> {
    Logger.log("Start of UserProfilesService : fetchProfileById: id:", id)
    const profileId = id
    const data = await this.userProfileModel.findByPk(profileId)
    Logger.log("End of UserProfilesService : fetchProfileById: :response", data)
    return data
  }

  public async fetchProfileByUserFK(id: number): Promise<UserProfile[]> {
    Logger.log("Start of UserProfilesService : fetchProfileByUserFK: id:", id)
    const user_fk = id
    const data = await this.userProfileModel.findAll({
      where: {user_fk: user_fk}
    })
    Logger.log(
      "End of UserProfilesService : fetchProfileByUserFK: :response",
      data
    )
    return data
  }

  public async fetchAllProfiles(): Promise<UserProfile[]> {
    Logger.log("Start of UserProfilesService : fetchAllProfiles")
    const data = await this.userProfileModel.findAll()
    Logger.log("End of UserProfilesService : fetchAllProfiles :response", data)
    return data
  }

  public async updatePassword(
    payload: UserProfile,
    id: number
  ): Promise<UserProfile> {
    Logger.log("Start of UserProfilesService : updatePassword userId: ", id)
    const user_fk = id
    const hash = crypto.createHash("md5").update(payload.password).digest("hex")
    payload.password = hash
    const query = `UPDATE userprofiles SET password = '${payload.password}' WHERE user_fk = ${user_fk}`
    await sequelizeConfig.query(query, {type: QueryTypes.UPDATE})
    await this.updateUserPassword(payload.password, user_fk, payload.email)
    Logger.log("End of UserProfilesService : updatePassword ")
    return payload
  }

  public async deleteProfile(id: number): Promise<string> {
    Logger.log("Start of UserProfilesService : deleteProfile userId: ", id)
    const user_fk = id
    await this.userProfileModel.destroy({
      where: {user_fk: user_fk}
    })
    Logger.log("End of UserProfilesService : deleteProfile ")
    return "Deleted"
  }

  public async updateUserPassword(password, id, email): Promise<string> {
    Logger.log(
      "Start of UserProfilesService : updateUserPassword password: ",
      password
    )
    const query = `UPDATE users SET password = '${password}' WHERE id = ${id}`
    await sequelizeConfig.query(query, {type: QueryTypes.UPDATE})
    await this.createNotification(id, email)
    Logger.log("End of UserProfilesService : updateUserPassword")
    return "password updated"
  }

  public async createNotification(id, email): Promise<void> {
    Logger.log("Start of UserProfilesService : createNotification ")
    const notification = {} as Notification
    notification.notificationType = "CHANGEPASSWORD"
    notification.email = email
    notification.status = "NEW"
    notification.userFk = id
    notification.noOfRetry = 3
    await this.userNotification.saveNotification(notification)
    Logger.log("End of UserProfilesService : createNotification ")
  }
}
