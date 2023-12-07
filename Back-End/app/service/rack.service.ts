import { QueryTypes } from "sequelize"
import { sequelizeConfig } from "../config/seq.config"
import { Injectable, Logger } from "@nestjs/common"
import { Rack } from "../models/rack.model"
import { Tray } from "../models/tray.model"
import { InjectModel } from "@nestjs/sequelize"
import { File } from "../models/file.model"
import { environment } from "../environment"
import fileOp, { existsSync } from "fs"
const directoryPath = environment.fileUploadFolderPath
//for search query using this payload
export interface IRackSearch {
  name: string
  createdon: string
  client_fk: number
}

export interface ITrayIdAndImage {
  id?: string
  img?: string
}

//we are updating only several columns so i added interface than using model
export interface UpdateTrayLayout {
  id: number
  h: number
  w: number
  x: number
  y: number
}

@Injectable()
export class RackService {
  constructor(
    @InjectModel(Rack)
    private rackModel: typeof Rack,
    @InjectModel(Tray)
    private trayModel: typeof Tray,
    @InjectModel(File)
    private fileModel: typeof File
  ) { }
  public async rackCreate(payload: Rack): Promise<Rack> {
    Logger.log("Start of RackService : rackCreate : payload", payload)
    const rack = payload
    const createRack = await this.rackModel.create(rack)
    this.createTrayObject(
      createRack.id,
      createRack.no_of_rows,
      createRack.no_of_columns
    )
    Logger.log("End of RackService : rackCreate :response", createRack)
    return createRack
  }

  public async createTrayObject(
    id: number,
    no_of_rows: number,
    no_of_columns: number
  ): Promise<void> {
    Logger.log("Start of RackService : createTrayObject")
    const tray = {} as Tray
    tray.x = 0
    tray.y = 0
    tray.w = 0
    tray.h = 0
    tray.rack_fk = 0
    tray.name = ""
    tray.color = ""
    tray.searchable = true

    for (let i = 0; i <= no_of_rows - 1; i++) {
      for (let j = 0; j <= no_of_columns - 1; j++) {
        tray.rack_fk = id
        tray.x = i
        tray.y = j
        tray.w = 1
        tray.h = 1
        tray.name = "r" + tray.x + "c" + tray.y
        tray.color = "0000ff"
        tray.searchable = true
        this.trayModel.create(tray)
      }
    }
    Logger.log("End of RackService : createTrayObject")
  }

  public async fetchRackById(id: number): Promise<Rack | null> {
    Logger.log("Start of RackService : fetchRackById :id", id)
    const rackId = id
    const fetchRackById = await this.rackModel.findByPk(rackId)
    Logger.log("End of RackService : fetchRackById ::response", fetchRackById)
    return fetchRackById
  }

  public async findAllRackOnClientFk(id: number): Promise<Rack[]> {
    Logger.log("Start of RackService : findAllRackOnClientFk :id", id)
    const client_fk = id  
    const listOfRacksWithStore = await sequelizeConfig.query(`SELECT r.*, s."storeName" FROM "racks" r JOIN "stores" s ON r."storeFk" = s."storeId" WHERE r."client_fk" = ${client_fk}`,
      {
        type: QueryTypes.SELECT,
        model: this.rackModel
      })

    Logger.log(
      "End of RackService : findAllRackOnClientFk :response",
      listOfRacksWithStore
    )
    return listOfRacksWithStore
  }

  public async updateRackById(
    payload: Rack,
    id: number
  ): Promise<[number | Rack]> {
    Logger.log("Start of RackService : updateRackById :id", id)
    const rackId = id
    const rackBody = payload
    const updateRackById = await this.rackModel.update(rackBody, {
      where: { id: rackId }
    })
    Logger.log("End of RackService : updateRackById :response", updateRackById)
    return updateRackById
  }

  public async deleteRackById(id: number): Promise<string> {
    Logger.log("Start of RackService : deleteRackById :id", id)
    const rackId = id
    await this.deleteFileByRackId(rackId)
    await this.deleteTrayByRackFk(rackId)
    await this.deleteTrayItem(rackId)
    await this.rackModel.destroy({
      where: { id: rackId }
    })
    Logger.log("End of RackService : deleteRackById")
    return "deleted"
  }

  public async fetchRackByClientId(name: string, id: number): Promise<Rack[]> {
    Logger.log(
      "Start of RackService : fetchRackByClientId :id",
      id + "name",
      name
    )
    const tableName = name
    const client_fk = id
    const fetchRackByClientId = await sequelizeConfig.query(
      `SELECT * FROM ${tableName} WHERE client_fk = ${client_fk}`,
      {
        type: QueryTypes.SELECT,
        model: this.rackModel
      }
    )
    Logger.log(
      "End of RackService : fetchRackByClientId :response",
      fetchRackByClientId
    )
    return fetchRackByClientId
  }

  public async searchRack(payload: IRackSearch): Promise<IRackSearch> {
    Logger.log("Start of RackService : searchRack :payload", payload)
    const rackname = payload.name
    const createdon = payload.createdon
    const client_fk = payload.client_fk
    let searchRackQuery
    if (createdon == "") {
      searchRackQuery = `SELECT * FROM racks WHERE name LIKE '%${rackname}%' AND client_fk = ${client_fk} `
    } else if (rackname == "") {
      searchRackQuery = `SELECT * FROM racks WHERE "createdAt" > '${createdon}' AND client_fk = ${client_fk} `
    } else
      searchRackQuery = `SELECT * FROM racks WHERE name LIKE '%${rackname}%' AND ("createdAt" > '${createdon}' AND client_fk = ${client_fk})`

    const searchRack = await sequelizeConfig.query(searchRackQuery, {
      type: QueryTypes.SELECT
    })
    Logger.log("End of RackService : searchRack :response", searchRack)
    return searchRack
  }

  public async deleteFileByRackId(rack_fk: number): Promise<string> {
    Logger.log("Start of RackService : deleteFileByTrayFk :id", rack_fk)
    const rackID = +rack_fk


    const deleteFileRecordQuery = `DELETE FROM files WHERE id IN (SELECT 
      f.id 
    FROM 
      files f 
      JOIN trays t ON t.id = f.tray_fk 
      JOIN racks r ON r.id = t.rack_fk 
    WHERE 
      r.id = ${rackID})`
    await sequelizeConfig.query(deleteFileRecordQuery, {
      type: QueryTypes.DELETE
    })

    const directory = directoryPath + "rack_" + rack_fk;
    if (existsSync(directory)) {
      fileOp.rmdirSync(directory, { recursive: true });
    }

    Logger.log("End of RackService : deleteTrayByRackFk")
    return "deleted"
  }

  public async trayCreate(payload: Tray): Promise<Tray> {
    Logger.log("Start of RackService : trayCreate :payload", payload)
    // Save Tray in the database
    const createTray = await this.trayModel.create(payload)
    Logger.log("End of RackService : trayCreate :response", createTray)
    return createTray
  }

  public async fetchTrayById(id: number): Promise<Tray | null> {
    Logger.log("Start of RackService : fetchTrayById :id", id)
    const trayId = id
    const fetchTrayById = await this.trayModel.findByPk(trayId)
    Logger.log("End of RackService : fetchTrayById :response", fetchTrayById)
    return fetchTrayById
  }

  public async updateTray(
    payload: Tray,
    storeid: number
  ): Promise<[number | Tray]> {
    Logger.log("Start of RackService : updateTray :id", storeid)
    const id = storeid
    const updateTray = await this.trayModel.update(payload, {
      where: { id: id }
    })
    Logger.log("End of RackService : updateTray : response", updateTray)
    return updateTray
  }

  public async deleteTrayById(id: number): Promise<string> {
    Logger.log("Start of RackService : deleteTrayById :id", id)
    const trayId = id
    await this.trayModel.destroy({
      where: { id: trayId }
    })
    Logger.log("End of RackService : deleteTrayById")
    return "deleted"
  }

  public async deleteTrayByRackFk(rack_fk: number): Promise<string> {
    Logger.log("Start of RackService : deleteTrayByRackFk :id", rack_fk)
    const tableName = "trays"
    await sequelizeConfig.query(
      `DELETE FROM "${tableName}" WHERE rack_fk = ${rack_fk} `,
      {
        type: QueryTypes.DELETE
      }
    )
    Logger.log("End of RackService : deleteTrayByRackFk")
    return "deleted"
  }

  public async deleteTrayItemByFormAndTrayId(
    id: number,
    trayid: number
  ): Promise<string> {
    Logger.log(
      "Start of RackService : deleteTrayItemByFormAndTrayId :id",
      id,
      "trayid",
      trayid
    )
    const formId = id
    const trayId = trayid
    const tableName = "trayItems"
    await sequelizeConfig.query(
      `DELETE FROM "${tableName}" WHERE "formId" = ${formId} AND "trayId" = ${trayId}`,
      {
        type: QueryTypes.DELETE
      }
    )
    Logger.log("End of RackService : deleteTrayItemByFormAndTrayId")
    return "deleted"
  }

  public async deleteTrayItem(id: number): Promise<string> {
    Logger.log("Start of RackService : deleteTrayItem :id", id)
    const formId = id
    const tableName = "trayItems"
    await sequelizeConfig.query(
      `DELETE FROM "${tableName}" WHERE "formId" = ${formId} `,
      {
        type: QueryTypes.DELETE
      }
    )
    Logger.log("End of RackService : deleteTrayItem")
    return "deleted"
  }

  public async fetchTrayDataByRackId(id: number): Promise<Tray[]> {
    Logger.log("Start of RackService : fetchTrayDataByRackId :id", id)
    const tableName = "trays"
    const tableName2 = "trayItems"
    const rack_fk = id
    const getTraysByRackIdQuery = `SELECT ${tableName}.id,${tableName}.name,${tableName}.color,${tableName}."searchable",${tableName}.img,SUM("${tableName2}".quantity)
   AS quantity FROM ${tableName} FULL JOIN "${tableName2}"
   ON trays.id = "${tableName2}"."trayId"
   WHERE ${tableName}.rack_fk = ${rack_fk} 
   GROUP BY ${tableName}.id 
   ORDER BY ${tableName}.id ASC`
    const fetchTrayByRackId = await sequelizeConfig.query(
      getTraysByRackIdQuery,
      {
        type: QueryTypes.SELECT
      }
    )
    Logger.log(
      "End of RackService : fetchTrayDataByRackId :response ",
      fetchTrayByRackId
    )
    return fetchTrayByRackId
  }

  public async fetchTrayPropByRackId(id: number): Promise<Tray[]> {
    Logger.log("Start of RackService : fetchTrayPropByRackId :id", id)
    const tableName = "trays"
    const rack_fk = id
    const selectPropByRackId = `SELECT id,x,y,w,h FROM ${tableName} WHERE rack_fk = ${rack_fk} ORDER BY id ASC `
    const fetchTrayPropByRackId = await sequelizeConfig.query(
      selectPropByRackId,
      {
        type: QueryTypes.SELECT,
        model: this.trayModel
      }
    )
    Logger.log(
      "End of RackService : fetchTrayPropByRackId response ",
      fetchTrayPropByRackId
    )
    return fetchTrayPropByRackId
  }

  public async fetchRackByStoreFk(id: number): Promise<Rack[]> {
    Logger.log("Start of RackService : fetchRackByStoreFk :id", id)
    const storeFk = id
    const fetchRackByStoreFk = await this.rackModel.findAll({
      where: { storeFk: storeFk },
      order: [["id", "ASC"]]
    })
    return fetchRackByStoreFk
  }

  public async fetchTrays(): Promise<Tray[]> {
    Logger.log("Start of RackService : fetchTrays")
    const extractAllTrays = `SELECT DISTINCT r.name,s."storeName",s.longitude,s.latitude,s.location, from "trayItems" ti INNER JOIN trays t 
  on t.id=ti."trayId" INNER JOIN racks r
  on r.id=t.rack_fk INNER JOIN stores s
  on s."storeId"=r."storeFk" INNER JOIN "userStores" u
  on u."storeId"=s."storeId"`
    const fetchTrays = await sequelizeConfig.query(extractAllTrays, {
      type: QueryTypes.SELECT,
      model: Tray,
      mapToModel: true
    })
    Logger.log("End of RackService : fetchTrays :response", fetchTrays)
    return fetchTrays
  }
  public async updateTrayLayout(
    payload: UpdateTrayLayout[],
    trayId: number
  ): Promise<UpdateTrayLayout[]> {
    Logger.log("Start of RackService : updateTrayLayout :trayId", trayId)
    const trayList = payload
    let  updateTray: any
    for(var i = 0; i <= trayList.length - 1; i++){
      const updateTraysQuery = `UPDATE trays SET h = '${trayList[i].h}',w = '${trayList[i].w}',x = '${trayList[i].x}',y = '${trayList[i].y}' WHERE id = ${trayList[i].id}`
      updateTray = await sequelizeConfig.query(updateTraysQuery, {
        type: QueryTypes.UPDATE
      })
    }
    Logger.log("End of RackService : updateTrayLayout")
    return updateTray
  }

  public async searchItemsByRack(
    searchString: string,
    userId: number,
    clientFk: number,
    schemaName: string
  ) {
    let tableName
    let tableNames: Array<{ name: string }> = []
    const extractTableNames = `SELECT DISTINCT  t.name FROM users u INNER JOIN
      templates t on u."clientFk"=t."clientFk" AND u."clientFk"=${clientFk}`
    tableNames = await sequelizeConfig.query(extractTableNames, {
      type: QueryTypes.SELECT
    })
    let unionQuery = ""
    searchString = searchString.replace(/ /g, '&')
    for (let i = 0; i <= tableNames.length - 1; i++) {
      tableName = tableNames[i].name
      unionQuery += `(SELECT id FROM ${schemaName}.${tableName}_template WHERE
          to_tsvector(attributes::text) @@ to_tsquery('${searchString}')) UNION `
    }
    const removeUnion = unionQuery.lastIndexOf("UNION")
    unionQuery = unionQuery.substring(0, removeUnion)
    const itemIds = await sequelizeConfig.query(unionQuery, {
      type: QueryTypes.SELECT
    })
    console.log(itemIds)

    const itemObjIDs = itemIds.map(obj => {
      return obj.id
    })
    const separatedIds = itemObjIDs.join(",")
    const namesQuery = `SELECT DISTINCT "storeName", r.name as rackName, 
      t.name as trayName,s."createdAt",r.id as rackId,t.id as trayId
      FROM stores s INNER JOIN users u
      on s.client_fk=u."clientFk" AND u."clientFk"=${clientFk} INNER JOIN racks r
      on r."storeFk"=s."storeId" INNER JOIN trays t
      on r.id=t.rack_fk INNER JOIN "trayItems" ti
      on ti."trayId"=t.id
      WHERE ti."formId" in (${separatedIds})`
    const namesLists = await sequelizeConfig.query(namesQuery, {
      type: QueryTypes.SELECT
    })
    return namesLists
  }

  public async deleteFileByTrayFk(rack_fk: number): Promise<string> {
    Logger.log("Start of RackService : deleteFileByTrayFk :id", rack_fk)
    const tableName = "trays"
    const getTrayIdAndImage = `SELECT id, img FROM "${tableName}" WHERE "rack_fk" = '${rack_fk}'`
    const getTrayIdAndImageQuery = await sequelizeConfig.query(getTrayIdAndImage, {
      type: QueryTypes.SELECT
    })
    let trays: ITrayIdAndImage = {
      id: '',
      img: ''
    }
    for (trays of getTrayIdAndImageQuery) {
      if (trays.img != null) {
        await this.fileModel.destroy({
          where: { tray_fk: trays.id },
        })
      }
    }
    Logger.log("End of RackService : deleteTrayByRackFk")
    return "deleted"
  }
}
