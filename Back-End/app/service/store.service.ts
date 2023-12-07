import {Injectable, Logger} from "@nestjs/common"
import {Store} from "../models/store.model"
import {InjectModel} from "@nestjs/sequelize"

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private storeModel: typeof Store
  ) {}
  public async create(payload: Store): Promise<Store> {
    Logger.log("Start of StoreService : create ")
    const response = await this.storeModel.create(payload)
    Logger.log("End of StoreService : create :response", response)
    return response
  }

  public async fetchStoreById(id: number): Promise<Store | null> {
    Logger.log("Start of StoreService : fetchStoreById :id", id)
    const response = await this.storeModel.findByPk(id)
    Logger.log("End of StoreService : fetchStoreById  :response", response)
    return response
  }
  public async updateStore(
    payload: Store,
    id: number
  ): Promise<[number | Store]> {
    Logger.log("Start of StoreService : updateStore :id", id)
    const storeID = id
    const RequestBody = payload
    const updateStore = await this.storeModel.update(RequestBody, {
      where: {storeId: storeID}
    })
    Logger.log("End of StoreService : updateStore :response", updateStore)
    return updateStore
  }

  public async storeDelete(id: number): Promise<string> {
    Logger.log("Start of StoreService : storeDelete :id", id)
    const storeId = id
    await this.storeModel.destroy({
      where: {storeId: storeId}
    })
    Logger.log("End of StoreService : storeDelete")
    return "deleted"
  }

  public async fetchAllStoresByClientFK(id: number): Promise<Store[]> {
    Logger.log("Start of StoreService : fetchAllStoresByClientFK :id", id)
    const client_fk = id
    const data = await this.storeModel.findAll({where: {client_fk: client_fk}})
    Logger.log("End of StoreService : fetchAllStoresByClientFK :response", data)
    return data
  }
}
