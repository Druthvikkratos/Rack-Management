import { Op, QueryTypes } from "sequelize"
import { EscalationController } from "../controller/escalation.controller"
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common"
import { NotificationSettings } from "../models/notificationSettings.model"
import { InjectModel } from "@nestjs/sequelize"
import { Escalation } from "../models/esculation.model"
import { sequelizeConfig } from "../config/seq.config"

@Injectable()
export class NotificationSettingService {
  constructor(
    @InjectModel(NotificationSettings)
    private notificationSettingsModel: typeof NotificationSettings,
    @InjectModel(Escalation)
    private escalationModel: typeof Escalation,
    @Inject(forwardRef(() => EscalationController))
    private escalationController: EscalationController
  ) { }
  public async createNotificationSetting(
    payload: NotificationSettings
  ): Promise<NotificationSettings> {
    Logger.log(
      "Start of NotificationSettingService : createNotificationSetting :payload",
      payload
    )
    // Save Notification in the database
    const createNotificationSetting =
      await this.notificationSettingsModel.create(payload)

    await this.escalationController.createEscalation(payload.escalation[0])
    Logger.log(
      "End of NotificationSettingService : createNotificationSetting :response",
      createNotificationSetting
    )
    return createNotificationSetting
  }

  public async fetchNotificationSettingById(
    id: number
  ): Promise<NotificationSettings | null> {
    Logger.log(
      "Start of NotificationSettingService : fetchNotificationSettingById : id",
      id
    )

    const fetchNotificationSettingById =
      await this.notificationSettingsModel.findByPk(id)
    Logger.log(
      "End of NotificationSettingService : fetchNotificationSettingById :response",
      fetchNotificationSettingById
    )
    return fetchNotificationSettingById
  }

  public async deleteNotificationSetting(id: number): Promise<string> {
    Logger.log(
      "Start of NotificationSettingService : deleteNotificationSetting : id",
      id
    )
    const notificationId = id
    const deleteNotification = await this.notificationSettingsModel.destroy({
      where: { id: notificationId }
    })
    Logger.log(
      "End of NotificationSettingService : fetchNotificationSettingById :response",
      deleteNotification
    )
    return "deleted"
  }

  public async fetchNotificationSettingByStoreFk(
    id: number
  ): Promise<NotificationSettings[]> {
    Logger.log(
      "Start of NotificationSettingService : fetchNotificationSettingByStoreFk : id",
      id
    )
    const storeFk = id
    const fetchNotificationSettingByStoreFk =
      await this.notificationSettingsModel.findAll({ where: { storeFk: storeFk } })
    Logger.log(
      "End of NotificationSettingService : fetchNotificationSettingByStoreFk :response",
      fetchNotificationSettingByStoreFk
    )
    return fetchNotificationSettingByStoreFk
  }

  public async fetchNotificationSettingByStoreFkNotNull(): Promise<
    NotificationSettings[]
  > {
    Logger.log(
      "Start of NotificationSettingService : fetchNotificationSettingByStoreFkNotNull"
    )

    const fetchNotificationSettingByStoreFkNotNull =
      await this.notificationSettingsModel.findAll({
        where: { storeFk: { [Op.not]: null } }
      })
    Logger.log(
      "End of NotificationSettingService : fetchNotificationSettingByStoreFkNotNull :response",
      fetchNotificationSettingByStoreFkNotNull
    )
    return fetchNotificationSettingByStoreFkNotNull
  }

  public async fetchNotificationSettingsAndEscalation(id: number): Promise<NotificationSettings[]> {
    Logger.log("Start of NotificationSettingService : fetchNotificationSettingsAndEscalation :id", id)
    const selectPropByRackId = `SELECT "notificationSettings".*, escalations.* FROM "notificationSettings"
  JOIN escalations ON "notificationSettings".id=escalations."notificationSettngFk" WHERE "notificationSettings".id=${id} `
    const fetchTrayPropByRackId = await sequelizeConfig.query(
      selectPropByRackId,
      {
        type: QueryTypes.SELECT,
        model: this.notificationSettingsModel
      }
    )
    Logger.log(
      "End of RackService : fetchTrayPropByRackId response ",
      fetchTrayPropByRackId
    )
    return fetchTrayPropByRackId
  }

  public async updateNotificationSetting(payload: NotificationSettings, id: number) {
    Logger.log("Start of NotificationSettingService : updateNotificationSetting :id", id)
    const notificationSetting = await this.notificationSettingsModel.update(payload[0], { where: { id: id } })
    const escalation = {} as Escalation
      escalation.escalationType = payload[0].escalationType
      escalation.noOfRemainder = payload[0].noOfRemainder
      escalation.timeToEscalate = payload[0].timeToEscalate
      escalation.to = payload[0].to
      await this.escalationController.updateEsculationData(escalation,payload[0].notificationSettngFk)
    Logger.log(
      "End of NotificationSettingService : updateNotificationSetting response ",
 
    )
    return notificationSetting
  }
}
