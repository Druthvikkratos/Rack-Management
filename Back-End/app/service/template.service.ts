import { QueryTypes } from "sequelize"
import { sequelizeConfig } from "../config/seq.config"
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common"
import { FormService } from "./form.service"
import { MenuService } from "./menu.service"
import { Template } from "../models/item.model"
import { InjectModel } from "@nestjs/sequelize"
import { Menu } from "../models/menu.model"
//alter name i have to pass name as a payload so i used interface
export interface IitemRename {
  name: string
}

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template)
    private templateModel: typeof Template,
    @Inject(forwardRef(() => MenuService))
    private menuService: MenuService,
    @Inject(forwardRef(() => FormService))
    private formService: FormService
  ) { }
  public async create(
    clientFk: string,
    templateName: string,
    schemaName: string
  ): Promise<Template> {
    Logger.log(
      "Start : TemplateService  : create : templateName =",
      templateName,
      "schemaName = ",
      schemaName
    )
    const template = {} as Template
    template.attributes = []
    template.name = templateName
    template.description = templateName
    template.clientFk = +clientFk

    let query = `CREATE TABLE ${schemaName}.${templateName}_template (`
    query += `id SERIAL PRIMARY KEY, name character varying(255),  itemTempId integer,
    description character varying(255), attributes json, quantity integer ,createdAt timestamp with time zone NULL,
    updatedAt timestamp with time zone NULL, CONSTRAINT ${templateName}_fkey FOREIGN KEY (itemTempId)
    REFERENCES templates (id)
    ON UPDATE NO ACTION ON DELETE NO ACTION`
    query += ")"
    sequelizeConfig.query(query)
    const data = await this.templateModel.create(template)
    const menu = {} as Menu
    menu.label = data.dataValues.name
    menu.action = "menu" + "/" + data.dataValues.name + "/" + data.dataValues.id
    menu.menu_fk = 1
    menu.roleId = 1
    menu.templateID = data.dataValues.id
    menu.clientFk = +clientFk
    this.menuService.menuCreate(menu)
    Logger.log("End : TemplateService  : create : Response : ", data)

    return data
  }

  public async findAll(
    id: number
  ): Promise<Template[]> {
    Logger.log("Start : TemplateService  : findAll : client Fk =" + id)
    const clientFk = id
    let query = `SELECT * FROM templates WHERE "clientFk" = ${clientFk}`
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
      model: this.templateModel
    })
    Logger.log("End : TemplateService  : findAll : Response : ", data)
    return data
  }

  public async findOne(customerId: string): Promise<Template | null> {
    Logger.log(
      "Start : TemplateService  : findOne : customer Id =" + customerId
    )
    const id = customerId
    const data = await this.templateModel.findByPk(id)
    Logger.log("End : TemplateService  : findOne : Response : ", data)
    return data
  }

  public async findOneTemplate(
    username: string,
    customerId: number
  ): Promise<Template[]> {
    Logger.log(
      "Start : TemplateService  : findOneTemplate :  customer Id =",
      customerId
    )
    const id = customerId
    const name = username
    const data = await sequelizeConfig.query(
      `SELECT * FROM ${name}_template  WHERE id = ${id} `,
      {
        type: QueryTypes.SELECT,
        model: this.templateModel
      }
    )
    Logger.log("End : TemplateService  : findOneTemplate :  Response ", data)
    return data
  }
  public async updatetemp(
    updateId: number,
    name: string,
    payload: Template
  ): Promise<[number | Template]> {
    const id = updateId
    payload.attributes = JSON.stringify(payload.attributes)
    const num = await this.templateModel.update(payload, {
      where: { id: id }
    })
    return num
  }

  public async validation(name: string): Promise<Template[]> {
    Logger.log("Start : TemplateService  : validation :  name =", name)
    const value = name
    const data = await this.templateModel.findAll({ where: { name: value } })
    Logger.log("End : TemplateService  : validation :  response =", data)
    return data
  }
  public async deleteItem(id: number, name: string, schemaName: string): Promise<string> {
    const templateId = id
    await this.menuService.deleteMenu(templateId)
    await this.formService.deleteFromTemplate(name, templateId, schemaName)
    await this.templateModel.destroy({
      where: { id: id }
    })
    return "deleted"
  }
  public async alterTable(
    updateId: number,
    name: string,
    schemaName: string,
    payload: IitemRename,
    menuid: number
  ): Promise<[number | IitemRename]> {
    const id = updateId
    const tableName = name
    const menuId = menuid

    const updateTemplateName = payload.name.replaceAll(/ /g, "_")
    const currentTableName = tableName.replaceAll(/ /g, "_")
    await sequelizeConfig.query(
      `ALTER TABLE ${schemaName}.${currentTableName}_template
    RENAME TO ${updateTemplateName}_template;`,
      { type: QueryTypes.UPDATE }
    )
    payload.name = payload.name.replaceAll(/ /g, "_")
    let num = await this.templateModel.update(payload, {
      where: { id: id }
    })
    const menu = {} as Menu
    menu.label = payload.name!
    menu.id = menuId
    menu.action = "menu" + "/" + payload.name + "/" + id
    if (num[0] === 1) {
      await this.menuService.update(menu)
    } else {
      "cannot update menu"
    }
    return num
  }
}
