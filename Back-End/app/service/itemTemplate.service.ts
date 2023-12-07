import {Op} from "sequelize"
import {Injectable, Logger} from "@nestjs/common"
import {ItemTemplate} from "../models/itemTemplate.model"
import {InjectModel} from "@nestjs/sequelize"

export interface IitemTemplateService {
  name: string
  subscriberId?: number
  description?: string
}

@Injectable()
export class ItemTemplateService {
  constructor(
    @InjectModel(ItemTemplate)
    private itemTemplateModel: typeof ItemTemplate
  ) {}
  public async create(payload: ItemTemplate): Promise<ItemTemplate> {
    Logger.log("Start : ItemTemplateService  : create : name =", payload.name)
    if (!payload.name) {
      ;({
        message: "Content can not be empty!"
      })
    }
    const data = await this.itemTemplateModel.create(payload)
    Logger.log("End : ItemTemplateService  : create : responce ", data)
    return data
  }

  public async findAll(payload: IitemTemplateService): Promise<ItemTemplate[]> {
    Logger.log("Start : ItemTemplateService  : findAll : name = ", payload.name)
    const title = payload.name
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null
    const data = await this.itemTemplateModel.findAll({
      where: condition
    })
    Logger.log("End : ItemTemplateService  : findAll : responce ", data)
    return data
  }

  public async update(
    payload: ItemTemplate,
    itemtemplateid: number
  ): Promise<[number | ItemTemplate]> {
    Logger.log(
      "Start : ItemTemplateService  : update : itemtemplate id ",
      itemtemplateid
    )
    const id = itemtemplateid
    const num = await this.itemTemplateModel.update(payload, {
      where: {id: id}
    })
    Logger.log("End : ItemTemplateService  : update : responce ", num)
    return num
  }

  public async deleteItemTemplate(id: number): Promise<string> {
    Logger.log("Start : ItemTemplateService  : deleteItemTemplate : id =", id)
    const num = await this.itemTemplateModel.destroy({
      where: {id: id}
    })
    Logger.log(
      "End : ItemTemplateService  : deleteItemTemplate : responce ",
      num
    )
    return "deleted"
  }
}
