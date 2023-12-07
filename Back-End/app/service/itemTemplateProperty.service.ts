import {Injectable, Logger} from "@nestjs/common"
import {InjectModel} from "@nestjs/sequelize"
import {ItemTemplateProperty} from "../models/itemTemplateProperty.model"
import {Op} from "sequelize"

@Injectable()
export class ItemTemplatePropertyService {
  constructor(
    @InjectModel(ItemTemplateProperty)
    private itemTemplatePropertyModel: typeof ItemTemplateProperty
  ) {}
  public async create(
    payload: ItemTemplateProperty
  ): Promise<ItemTemplateProperty> {
    Logger.log(
      "Start : ItemTemplatePropertyService : create : name =",
      payload.name + " subscriberId =" + payload.subscriberId
    )
    const data = await this.itemTemplatePropertyModel.create(payload)
    Logger.log("End : ItemTemplatePropertyService : create : responce =", data)
    return data
  }

  public async findAll(
    payload: ItemTemplateProperty
  ): Promise<ItemTemplateProperty[]> {
    Logger.log(
      "Start : ItemTemplatePropertyService : findAll : title =",
      payload.name
    )
    const name = payload.name
    const condition = name ? {name: {[Op.like]: `%${name}%`}} : null
    const data = await this.itemTemplatePropertyModel.findAll({
      where: condition
    })
    Logger.log("End : ItemTemplatePropertyService : findAll : responce ", data)
    return data
  }

  public async update(
    id: number,
    payload: ItemTemplateProperty
  ): Promise<[number | ItemTemplateProperty]> {
    Logger.log("Start : ItemTemplatePropertyService : update : id =", id)
    const num = await this.itemTemplatePropertyModel.update(payload, {
      where: {id: id}
    })
    Logger.log("End : ItemTemplatePropertyService : update : responce =", num)
    return num
  }

  public async deleteTempProp(id: number): Promise<string> {
    Logger.log("Start : ItemTemplatePropertyService : update : id =", id)
    const num = await this.itemTemplatePropertyModel.destroy({
      where: {id: id}
    })
    Logger.log(
      "End : ItemTemplatePropertyService : deleteTempProp : responce =",
      num
    )
    return "deleted"
  }
}
