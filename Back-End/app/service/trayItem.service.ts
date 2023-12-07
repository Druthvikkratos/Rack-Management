import {sequelizeConfig} from "../config/seq.config"
import {EscalationController} from "../controller/escalation.controller"
import {QueryTypes} from "sequelize"
import {forwardRef, Inject, Injectable, Logger, Req} from "@nestjs/common"
import {TrayItem} from "../models/trayItem.model"
import {InjectModel} from "@nestjs/sequelize"
import {Request} from "express"
@Injectable()
export class TrayItemService {
  constructor(
    @InjectModel(TrayItem)
    private trayItemModel: typeof TrayItem,
    @Inject(forwardRef(() => EscalationController))
    private escalationController: EscalationController
  ) {}

  public async trayItemCreate(
    payload: TrayItem,
    templateName: string,
    schemaName: string
  ): Promise<TrayItem> {
    Logger.log("Start of TrayItemService : trayItemCreate")
    const trayItem = {} as TrayItem
    trayItem.quantity = payload.quantity
    trayItem.upperLimit = payload.upperLimit
    trayItem.lowerLimit = payload.lowerLimit
    trayItem.rackId = payload.rackId
    trayItem.trayId = payload.trayId
    trayItem.formId = payload.formId
    trayItem.tempId = payload.tempId
    trayItem.userFk = payload.userFk
    const createTray = this.trayItemModel.create(trayItem)
    await this.updateTray(payload)
    const selectAllFromTemplates = `SELECT * FROM "templates", "trayItems" WHERE "tempId" = ${payload.tempId} AND templates.id =${payload.tempId}`
    await sequelizeConfig.query(selectAllFromTemplates, {
      type: QueryTypes.SELECT
    })
    await sequelizeConfig.query(
      `UPDATE ${schemaName}.${templateName}_template SET  quantity =  quantity -${payload.quantity} WHERE id=${payload.formId}`,
      {type: QueryTypes.UPDATE}
    )
    Logger.log("End of TrayItemService : trayItemCreate :response", createTray)
    return createTray
  }

  public async updateTray(body: TrayItem): Promise<TrayItem[]> {
    const trayItem = {
      quantity: body.quantity,
      trayId: body.trayId
    }
    Logger.log("Start of TrayItemService : updateTray")
    const updateTrayByTrayIdQuery = `UPDATE trays set quantity = quantity+${trayItem.quantity} WHERE Id = ${trayItem.trayId}`
    Logger.log("End of TrayItemService : updateTray ")
    const executeUpdate = await sequelizeConfig.query(updateTrayByTrayIdQuery, {
      type: QueryTypes.UPDATE,
      model: this.trayItemModel
    })
    return executeUpdate
  }

  public async updateTrayItems(
    trayId: number,
    templateName: string,
    schemaName: string,
    payload: TrayItem,
    @Req() req: Request
  ): Promise<TrayItem[]> {
    Logger.log("Start of TrayItemService : updateTrayItems :trayId", trayId)
    const id = trayId
    const updateTrayItemsQuery = `UPDATE "trayItems" SET quantity = '${payload.quantity}',  "notificationSettngFk" = '${payload.notificationSettngFk}', "lowerLimit"= '${payload.lowerLimit}', "upperLimit"= '${payload.upperLimit}'
    WHERE id = ${id} And "trayId" = ${payload.trayId} And "tempId" = ${payload.tempId} And "formId" = ${payload.formId} `
    await sequelizeConfig.query(
      `UPDATE ${schemaName}.${templateName}_template SET quantity =  quantity -${payload.quantity} WHERE id=${payload.formId}`,
      {type: QueryTypes.UPDATE}
    )
    const updateEscalation = await sequelizeConfig.query(updateTrayItemsQuery, {
      type: QueryTypes.UPDATE,
      model: this.trayItemModel
    })
    try {
      if (updateEscalation[1]) {
        if (
          payload.quantity <= payload.lowerLimit ||
          payload.quantity >= payload.upperLimit
        ) {
          await this.escalationController.fetchByNotificationId(
            payload.notificationSettngFk,
            req,
            payload.userFk
          )
        }
      } else {
        ;({
          message: `Cannot update trayItems with id=${id}.`
        })
      }
    } catch (err) {
      ;({
        message: "Error updating Form with id=",
        err
      })
    }
    Logger.log(
      "End of TrayItemService : updateTrayItems :response",
      updateEscalation
    )
    return updateEscalation
  }
  public async updateLowerAndUpperLimit(
    trayId: number,
    payload: TrayItem
  ): Promise<TrayItem[]> {
    Logger.log("Start of TrayItemService : updateTrayItems :trayId", trayId)
    const id = trayId
    const updateLowerAndUpperLimitQuery = `UPDATE "trayItems" SET  "lowerLimit"= '${payload.lowerLimit}', "upperLimit"= '${payload.upperLimit}' 
    WHERE id = ${id} And "trayId" = ${payload.trayId} And "tempId" = ${payload.tempId} And "formId" = ${payload.formId} `
    const updateLowerAndUpperLimit = await sequelizeConfig.query(
      updateLowerAndUpperLimitQuery,
      {
        type: QueryTypes.UPDATE,
        model: this.trayItemModel
      }
    )
    Logger.log(
      "End of TrayItemService : updateTrayItems :response",
      updateLowerAndUpperLimit
    )
    return updateLowerAndUpperLimit
  }

  public async fetchAllItemsFromTray(): Promise<TrayItem[]> {
    Logger.log("Start of TrayItemService : updateTrayItems")
    const findAllTrayItems = await this.trayItemModel.findAll({
      order: [["updatedAt", "ASC"]]
    })
    Logger.log(
      "End of TrayItemService : updateTrayItems :response",
      findAllTrayItems
    )
    return findAllTrayItems
  }

  public async fetchItemByFormId(id: number): Promise<TrayItem[]> {
    Logger.log("Start of TrayItemService : fetchItemByFormId : id", id)
    const formId = id
    const findAllByFormId = await this.trayItemModel.findAll({
      where: {formId: formId}
    })
    Logger.log(
      "End of TrayItemService : fetchItemByFormId :response",
      findAllByFormId
    )
    return findAllByFormId
  }

  public async fetchTemplateAndTrayById(
    tempid: number,
    trayid: number
  ): Promise<TrayItem[]> {
    Logger.log("Start of TrayItemService : fetchTemplateAndTrayById : id")
    const tempId = tempid
    const trayId = trayid
    const fetchAllTrayById = await this.trayItemModel.findAll({
      where: {tempId: tempId, trayId: trayId},
      order: [["updatedAt", "ASC"]]
    })
    Logger.log(
      "End of TrayItemService : fetchTemplateAndTrayById :response",
      fetchAllTrayById
    )
    return fetchAllTrayById
  }

  public async fetchTrayTemplateAndFormById(
    trayid: number,
    tempid: number,
    formid: number
  ): Promise<TrayItem[]> {
    Logger.log(
      "Start of TrayItemService : fetchTrayTemplateAndFormById : id",
      trayid
    )
    const trayId = trayid
    const tempId = tempid
    const formId = formid
    const trayByTrayId = await this.trayItemModel.findAll({
      where: {
        trayId: trayId,
        tempId: tempId,
        formId: formId
      },
      order: [["updatedAt", "DESC"]]
    })
    Logger.log(
      "End of TrayItemService : fetchTrayTemplateAndFormById :response",
      trayByTrayId
    )
    return trayByTrayId
  }

  public async createNotificationBasedOnTimeInterval(): Promise<any> {
    let content: any

    Logger.log(
      "Start of TrayItemService : createNotificationBasedOnTimeInterval"
    )
    let notificationdata: Array<{
      content: any
      updatedAt: Date
      noofreminders: number
      id: number
    }> = []
    let escalationRecord: Array<{timeToEscalate: string}> = []
    let trayItemRecord: Array<{
      quantity: number
      lowerLimit: number
      upperLimit: number
    }> = []
    const notificationQuery = `SELECT *
    FROM public.notifications AS "time"
    WHERE "time"."createdAt" BETWEEN NOW() - INTERVAL '7 DAYS' AND NOW()
    AND "notificationType" = 'QUANTITY-ALERT' AND status = 'SENT'
    ORDER BY "time"."createdAt" DESC`
    notificationdata = await sequelizeConfig.query(notificationQuery, {
      type: QueryTypes.SELECT
    })
    for (let i = 0; i < notificationdata.length; i++) {
      content = notificationdata[i].content
      const trayItemQuery = `SELECT * FROM "trayItems" WHERE "trayId"='${content.trayId}'  AND "rackId"='${content.rackId}'  AND "tempId" = '${content.tempId}'`
      trayItemRecord = await sequelizeConfig.query(trayItemQuery, {
        type: QueryTypes.SELECT
      })
      const escalationQuery = `SELECT "timeToEscalate" FROM escalations 
      WHERE "notificationSettngFk"= '${notificationdata[i].content.notificationSettngFk}'`
      escalationRecord = await sequelizeConfig.query(escalationQuery, {
        type: QueryTypes.SELECT
      })
      const presentDate = new Date().getTime()
      const updatedDate = new Date(notificationdata[i].updatedAt).getTime()
      const differenceOfDates = new Date(presentDate - updatedDate)
      const differnce = differenceOfDates.getUTCDate()
      const stringTimeInterval = escalationRecord[0].timeToEscalate
      //in escalation table time interval is saved in string format ex: 3 days
      //so im extracting integer value from string and converting string to number
      const integerInString = stringTimeInterval.match(/(\d+)/)!
      // converting string to number ex: "3"  to 3
      const intValueOfTimeInterval = Number(integerInString[0])
      if (
        (trayItemRecord[0].quantity <= trayItemRecord[0].lowerLimit ||
          trayItemRecord[0].quantity >= trayItemRecord[0].upperLimit) &&
        differnce == intValueOfTimeInterval &&
        notificationdata[i].noofreminders <= intValueOfTimeInterval
      ) {
        const updateNotificationRecordQuery = `UPDATE notifications SET noofreminders = noofreminders + 1, status='NEW'
        WHERE id = ${notificationdata[i].id}`
        return await sequelizeConfig.query(updateNotificationRecordQuery, {
          type: QueryTypes.UPDATE
        })
      } else {
        return notificationdata
      }
    }
    Logger.log(
      "End of TrayItemService : createNotificationBasedOnTimeInterval :response"
    )
  }
}
