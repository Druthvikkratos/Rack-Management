import {QueryTypes} from "sequelize"
import {sequelizeConfig} from "../config/seq.config"
import fileOp from "fs"
import { environment } from "../environment"
const baseUrl = environment.baseUrl + "/api/user/files/profile/"
const directoryPath =  environment.fileUploadFolderPath
import {Injectable, Logger} from "@nestjs/common"
import {File} from "../models/file.model"
import {InjectModel} from "@nestjs/sequelize"

export interface IFileDownload {
  filename: string
  filePath?: string
  user_fk?: number
  tray_fk?: number
  rack_id?:number
}

@Injectable()
export class FileDownLoadService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File
  ) {}
  public async fileCreate(payload: File): Promise<File> {
    Logger.log(
      "Start : FileDownLoadService : fileCreate : file name =",
      payload.filename
    )
    const filePath = baseUrl + payload.filename
    payload.filepath = filePath
    fileOp.copyFile(
      directoryPath + payload.filename,
      directoryPath + payload.filename,
      err => {
        if (err) {
          Logger.error("file not copied" + err)
        }
      }
    )
    const data = await this.fileModel.create(payload)
    Logger.log("End : FileDownLoadService : fileCreate : response =", data)
    return data
  }

  public async fileCreateTray(payload: IFileDownload) {
    Logger.log(
      "Start : FileDownLoadService : fileCreateTray : file name =",
      payload.filename
    )
    const filePath = baseUrl  + payload.rack_id  + "/" + payload.tray_fk + "/" + payload.filename
    payload.filePath = filePath
    const file = {
      filename: payload.filename,
      filepath: payload.filePath,
      tray_fk: payload.tray_fk
    }
    fileOp.copyFile(
      directoryPath + "rack_" + payload.rack_id +"/tray_" + payload.tray_fk + "/" + file.filename,
      directoryPath + "rack_" + payload.rack_id +"/tray_" + payload.tray_fk + "/" + file.filename,
      err => {
        if (err) {
          Logger.error("file not copied" + err)
        }
      }
    )
    const data = await this.fileModel.create(file)
    Logger.log("End : FileDownLoadService : fileCreateTray : response =", data)
    return data
  }

  public async findOne(id: string): Promise<File[]> {
    Logger.log("Start : FileDownLoadService  : findOne : file id =", id)
    const user_fk = id

    const data = await this.fileModel.findAll({where: {user_fk: user_fk}})
    Logger.log("End : FileDownLoadService : findOne : responce :", data)
    return data
  }

  public async updateFile(updateId: number, payload: File): Promise<void> {
    Logger.log(
      "Start : FileDownLoadService : updateFile : update Id : ",
      updateId
    )
    const id = updateId
    const file = {
      filename: payload.filename,
      filepath: payload.filepath + payload.filename
    }
    const query = `UPDATE files SET filepath = '${file.filepath}',filename = '${file.filename}' WHERE id = ${id}`
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.UPDATE
    })
    if (data[1].rowCount > 0) {
      fileOp.copyFile(
        directoryPath + file.filename,
        directoryPath + "/profile/" + file.filename,
        err => {
          if (err) Logger.error("file copied")
        }
      )
      ;({
        message: "profile password was updated successfully."
      })
    } else {
      ;({
        message: `Cannot update profile password id=${id}`
      })
    }
    Logger.log("End : FileDownLoadService : updateFile ")
  }

  public async fetchTrayFile(id: number): Promise<File[]> {
    Logger.log("Start : FileDownLoadService : fetchTrayFile")
    const data = await this.fileModel.findAll({where: {tray_fk: id}})
    Logger.log("End : FileDownLoadService : Response :", data)
    return data
  }

  public async updateTrayByFile(
    tray_fk: number,
    payload: IFileDownload
  ):Promise<File[]> {
    Logger.log(
      "Start : FileDownLoadService : updateTrayByFile File name = ",
      payload.filename,
      " Tray_fk = ",
      payload.tray_fk
    )
    
     const filename = `SELECT filename from files WHERE tray_fk = ${tray_fk}`
     const trayFileName = await sequelizeConfig.query(filename, {
        type: QueryTypes.SELECT,
        model: this.fileModel
      })

     fileOp.unlink(directoryPath + "rack_" + payload.rack_id +"/tray_" + tray_fk + "/" + trayFileName[0].filename, (err) => {
      if (err) {
        throw err;
      }      
    });
    const file = {
      filename: payload.filename,
      filepath: directoryPath
    }
    const query = `UPDATE files SET filepath = '${file.filepath}' WHERE tray_fk = ${tray_fk}`
    const data = await sequelizeConfig.query(query, {
      type: QueryTypes.UPDATE,
      model: this.fileModel
    })
    Logger.log("End : FileDownLoadService : updateTrayByFile : response ", data)
   return data
  }
}
