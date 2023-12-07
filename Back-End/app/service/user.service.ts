import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger
} from "@nestjs/common"
import { QueryTypes } from "sequelize"
import { sequelizeConfig } from "../config/seq.config"
import crypto from "crypto"
import config from "../configemail.json"
import fs from "fs"
import { UserNotification } from "../middleware/userNotification"
import elasticSearchController from "../controller/elasticsearch.controller"
import { UserStoreServices } from "./userStore.service"
import { UserProfilesService } from "./userProfile.service"
import { elasticSearchConfig } from "../config/connection"
import { User } from "../models/user.model"
import { UserProfile } from "../models/userProfile.model"
import { InjectModel } from "@nestjs/sequelize"
import { TemplateService } from "./template.service"
import { Client } from "../models/client.model"
import { Role } from "../models/role.model"
import { Plan } from "../models/plan.model"
import { UserStore } from "../models/userStore.model"
import { Notification } from "../models/notification.model"
import { Template } from "../models/item.model"
import { Menu } from "../models/menu.model"
import { Store } from "../models/store.model"
import { NotificationService } from "./notification.service"
import ShortUniqueId from 'short-unique-id';
import { environment } from "../environment"

//There is no model based on staff so i created a interface based on staff object for update
export interface ISaveData {
  selectedStore?: UserStore[]
  id?: number
  username: string
  email: string
  password: string
  clientFk: number
  roleId: number
  esUrl: string
}

//For login there is no model available so i am declaring it as a interface
export interface ILoginPaylod {
  username: string
  password: string
  status: string
  trailend?: Date
}

//For role we need role id it doesnt have model so i created interface
export interface IRole {
  id: number
}

//There is no model based on staff so i created a interface based on staff object with store
export class IStaff {
  id?: number
  username?: string
  email?: string
  confirmPassword?: string
  selectedStores?: Store[]
}

//there is no model based on elastic search url so i added interface
export interface IUpdateUserElasticSearchUrl {
  username: string
  rackId: number
  attributes: JSON
  name: string
}
//only fetching client name so i added interface for return type
export interface IclientName {
  name?: string
}

export interface ContactUs {
  email: string,
  message: string
  id: number,
  subject: any
  ticketNo: any
}

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserNotification))
    private userNotification: UserNotification,
    @InjectModel(User)
    private userModel: typeof User,
    @Inject(forwardRef(() => TemplateService))
    private itemcontroller: TemplateService,
    @Inject(forwardRef(() => UserProfilesService))
    private userProfilesController: UserProfilesService,
    @InjectModel(UserProfile)
    private userProfileModel: typeof UserProfile,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(Plan)
    private planModel: typeof Plan,
    @Inject(forwardRef(() => UserStoreServices))
    private userStoreService: UserStoreServices,
    @InjectModel(UserStore)
    private userStoreModel: typeof UserStore,
    @InjectModel(Notification)
    private notificationModel: typeof Notification,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) { }
  collections: string[] = []
  userName!: string
  roleName?: string

  //This Method Saves User in database
  public async CreateUser(paylod: User): Promise<User> {
    Logger.log("Start of UserService : CreateUser")
    try {
      const hash = crypto
        .createHash("md5")
        .update(paylod.password)
        .digest("hex")
      paylod.password = hash
        ; (paylod.esUrl = elasticSearchConfig.transport._config.host),
          "/rack/<RACK_NAME>_<RACK_PK>?routing=",
          paylod.username,
          "/refresh=true"
      const createUser = await this.userModel.create(paylod)
      /*after creating user it saves in the userprofile table also as i am using the previous call returning data
      its throwing error*/
      const createProfile = {} as UserProfile
      createProfile.userName = createUser.username
      createProfile.email = createUser.email
      createProfile.phone = createUser.phone
      createProfile.password = createUser.password
      createProfile.user_fk = createUser.id
      this.createProfileObject(createProfile)
      this.createNotificationRegister(createUser)
      Logger.log("End of UserService : CreateUser :reponse", createUser)
      return createUser
    } catch (e) {
      throw new HttpException(
        "Error in userControllers.createClient",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  public async createNotificationRegister(data, notificationType?: string): Promise<void> {
    notificationType = "REGISTERED"
    const notificationRecord = await this.createNotification(data, notificationType)
    await this.notificationService.sendNewUserRegsitrationMail(notificationRecord, notificationRecord.content)
  }

  public async createNotification(
    data,
    notificationType: string
  ): Promise<Notification> {
    Logger.log("Start of UserService : createNotification")

    const status = "NEW"
    const notification = {} as Notification
      ; (notification.notificationType = notificationType),
        (notification.email = data.email),
        (notification.status = status),
        (notification.content = data),
        (notification.userFk = data.id),
        (notification.noOfRetry = 3),
        (notification.newNotification = 1)

    const notificationRecord = await this.userNotification.saveNotification(notification)
    Logger.log("End of UserService : createNotification")
    return notificationRecord
  }
  public async createNotificationForForgotPassword(
    data,
    notificationType?: string
  ): Promise<Notification> {
    Logger.log("Start of UserService : createNotificationForForgotPassword")
    notificationType = "FORGOTPASSWORD"
    const notification = this.createNotification(data, notificationType)
    Logger.log("End of UserService : createNotificationForForgotPassword")
    return notification;

  }

  public async login(paylod: ILoginPaylod): Promise<ILoginPaylod> {
    Logger.log("Start of UserService : login", paylod)
    const hash = crypto.createHash("md5").update(paylod.password).digest("hex")
    paylod.password = hash
    paylod.status = "ACTIVE"

    const login = await this.userModel.findOne({
      where: {
        username: paylod.username,
        password: paylod.password,
        status: "ACTIVE"
      }
    })
    const loginUserProfile = await this.userProfileModel.findOne({
      where: {
        userName: paylod.username,
        password: paylod.password
      }
    })
    if (loginUserProfile?.image === null) {
      const defaultImageUrl = environment.baseUrl + '/api/user/files/profile/' + environment.defaultImage
      const updateQuery = `UPDATE "userprofiles" SET image = '${defaultImageUrl}' WHERE id = ${loginUserProfile.id}`
      await sequelizeConfig.query(updateQuery, {
        type: QueryTypes.UPDATE
      })
      const insertFileData = `INSERT INTO "files" (filename,filepath,user_fk,"createdAt","updatedAt") VALUES ('${environment.defaultImage}','${defaultImageUrl}',${login!.id},NOW(),NOW())`
      await sequelizeConfig.query(insertFileData, {
        type: QueryTypes.INSERT
      })
    }
    const query = `UPDATE users SET LoginDate = (NOW()) WHERE username = '${paylod.username}'`
    await sequelizeConfig.query(query, {
      type: QueryTypes.UPDATE
    })

    Logger.log("End of UserService : login :response", login)
    return login
  }

  async findOne(username: string, password: string) {
    return await this.userModel.findOne({
      where: {
        username: username,
        password: password,
        status: "ACTIVE"
      }
    })
  }

  public async createClient(payload: Client): Promise<Client> {
    Logger.log("Start of UserService : createClient")
    const createClient = await this.clientModel.create(payload)
    Logger.log("End of UserService : createClient :response", createClient)
    return createClient
  }

  public async getRole(): Promise<IRole[]> {
    Logger.log("Start of UserService : getRole")
    let getRole: Array<{ id: number }> = []
    const query = "SELECT id from roles WHERE name = 'Staff'"
    getRole = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT
    })
    Logger.log("End of UserService : getRole :response", getRole)
    return getRole
  }

  public async getClientStaffList(
    clientid: string,
    roleid: string
  ): Promise<Client[]> {
    Logger.log(
      "Start of UserService : getClientStaffList :clientId",
      clientid,
      "roleId",
      roleid
    )
    const clientFk = clientid
    const roleId = roleid
    const status = "ACTIVE"
    const tableName = "users"
    const query = `SELECT * FROM ${tableName} WHERE "clientFk" = ${clientFk} AND status = '${status}' AND  "roleId" = ${roleId}`
    const getClientStaffList = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
      model: this.clientModel
    })
    Logger.log(
      "End of UserService : getClientStaffList :response",
      getClientStaffList
    )
    return getClientStaffList
  }

  public async getClientNameByID(clientId: string): Promise<IclientName[]> {
    Logger.log("Start of UserService : getClientNameByID :clientId", clientId)
    let getClientNameById: Array<{ name: string }> = []
    const clientFk = clientId
    const query = `SELECT name from clients WHERE id = ${clientFk}`
    getClientNameById = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT
    })
    Logger.log(
      "End of UserService : getClientNameByID :response",
      getClientNameById
    )
    return getClientNameById
  }

  public async findOneByStaffId(staffId: number): Promise<IStaff> {
    Logger.log("Start of UserService : findOneByStaffId : id", staffId)
    const id = staffId
    const data = await this.userModel.findOne({ where: { id: id } })
    const userFk = data?.dataValues.id
    const staffData = data?.dataValues
    const fetchStoreByStaffId = await this.userStoreService.fetchStoreByStaffId(
      userFk,
      staffData
    )
    Logger.log("End of UserService : findOneByStaffId :response", data)
    return fetchStoreByStaffId
  }

  public async updateStaffByID(
    payload: ISaveData,
    updateid: number
  ): Promise<[number | ISaveData]> {
    Logger.log("Start of UserService : updateStaffByID : id", updateid)
    const id = updateid
    const hash = crypto.createHash("md5").update(payload.password).digest("hex")
    payload.password = hash
    const updateStaffById = await this.userModel.update(payload, {
      where: { id: id }
    })
    if (payload.selectedStore.length > 0) {
      this.fetchStoreByStaffId(id, payload.selectedStore)
    }
    Logger.log(
      "End of UserService : updateStaffByID :response",
      updateStaffById
    )
    return updateStaffById
  }

  public async fetchStoreByStaffId(userFk: number, stores): Promise<string> {
    Logger.log("Start of UserService : fetchStoreByStaffId : id", userFk)
    const userId = userFk
    const store = {
      storeId: 0,
      userFk: 0,
      storeName: ""
    }
    this.userStoreModel.findAll({ where: { userFk: userId } }).then(data => {
      const deleteRecord = data.filter(store =>
        stores.every(
          retrievedFromDb => retrievedFromDb.storeId !== store.storeId
        )
      )
      const saveRecordInToDb = stores.filter(store =>
        data.every(retrievedFromDb => retrievedFromDb.storeId !== store.storeId)
      )
      deleteRecord.forEach(store => {
        const storeId = store.storeId
        this.userStoreModel.destroy({
          where: { storeId: storeId }
        })
      })
      saveRecordInToDb.forEach(stores => {
        store.storeId = stores.storeId
        store.userFk = userId
        store.storeName = stores.storeName
        this.userStoreModel.create(store)
      })
    })
    Logger.log("End of UserService : fetchStoreByStaffId")
    return "success"
  }

  public async validation(name: string, email: string): Promise<User[]> {
    Logger.log(
      "Start of UserService : validation : name",
      name,
      ": email",
      email
    )
    const value = name
    const type = email
    let query
    if (value || type) {
      query = `SELECT * FROM users WHERE username = '${value}' OR email = '${type}'`
    }
    const validation = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT,
      model: this.userModel
    })
    Logger.log("End of UserService : validation  :response", validation)
    return validation
  }

  public async deleteStaff(user_fk: number): Promise<string> {
    Logger.log("Start of UserService : deleteStaff : clientId", user_fk)
    const id = user_fk
    this.userProfilesController.deleteProfile(id)
    await this.notificationModel.destroy({
      where: { userFk: id }
    })
    const deleteStaff = await this.userModel.destroy({
      where: { id: id }
    })
    Logger.log("End of UserService : validation :response", deleteStaff)
    return "deleted"
  }

  public async forgotpassword(payload: User): Promise<User[]> {
    Logger.log("Start of UserService : forgotpassword", payload)
    const email = payload.email
    const randomNumber = Math.random().toString(36).slice(2)
    const hash = crypto.createHash("md5").update(randomNumber).digest("hex")
    const password = hash

    const updatePassword = await sequelizeConfig.query(
      `UPDATE users SET password = '${password}' WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
        model: this.userModel
      }
    )
    await sequelizeConfig.query(
      `SELECT id from users WHERE email = '${email}'`,
      {
        type: QueryTypes.SELECT,
        model: this.userModel
      }
    )
    const notificationData = await this.createNotificationForForgotPassword(payload)
    await this.notificationService.forgotPasswordMail(notificationData, randomNumber)

    Logger.log("End of UserService : forgotpassword :response", updatePassword)
    return updatePassword
  }

  public async createProfileObject(data: UserProfile): Promise<void> {
    Logger.log("Start of UserService : createProfileObject")
    Logger.log("End of UserService : forgotpassword :response", data)
    this.userProfileModel.create(data)
  }

  //Creates profile in the database in userprofiles table.
  public async profileCreate(payload: UserProfile): Promise<UserProfile> {
    Logger.log("Start of UserService : profileCreate")
    const profileCreate = await this.userProfileModel.create(payload)
    Logger.log("End of UserService : profileCreate :response", profileCreate)
    return profileCreate
  }

  public async findAllPlans(): Promise<Plan[]> {
    Logger.log("Start of UserService : findAllPlans")
    const findAllPlans = await this.planModel.findAll({})
    Logger.log("End of UserService : findAllPlans :response", findAllPlans)
    return findAllPlans
  }

  public async updateUserStatus(
    clientid: number,
    userid: number
  ): Promise<User | [number]> {
    Logger.log("Start of UserService : updateUserStatus")
    const user = await this.userModel.findOne({ where: { id: userid } })
    if (user?.status == "ACTIVE") {
      return user
    } else {
      const clientFk = clientid
      const userPk = userid
      const updateUserStatus = await this.userModel.update(
        { status: "ACTIVE" },
        { where: { id: userPk } }
      )
      await this.generateUserMenuFile(userPk)
      const clientId = clientFk.toString()
      const userpk = userPk.toString()
      await this.createTemplateByPlan(clientId, userpk)

      Logger.log(
        "End of UserService : updateUserStatus :response",
        updateUserStatus
      )

      return updateUserStatus
    }
  }

  public async updateUserElasticSearchUrl(
    payload: IUpdateUserElasticSearchUrl,
    id: number
  ): Promise<void> {
    Logger.log("Start of UserService : updateUserElasticSearchUrl :id", id)
    const userPk = id
    const esUrl =
      elasticSearchConfig.transport._config.host +
      "/rack/" +
      payload.name +
      "/" +
      payload.rackId +
      "?routing=" +
      payload.username +
      "/refresh=true"

    await sequelizeConfig.query(
      `UPDATE users SET "esUrl" = '${esUrl}' WHERE id = '${userPk}' `,
      {
        type: QueryTypes.UPDATE
      }
    )

    elasticSearchController.createIndex(userPk)
    Logger.log("End of UserService : updateUserElasticSearchUrl ")
  }

  public async createTemplateByPlan(
    clientId: string,
    tempalateName: string
  ): Promise<Template[]> {
    Logger.log(
      "Start of UserService : createTemplateByPlan :clientId",
      clientId,
      "tempalateName",
      tempalateName
    )
    const clientName = await this.getClientNameByID(clientId)
    const clientFk = clientId
    const query = `SELECT p.* FROM plans p, clients c where c."planFk" = p.id and c.id = ${clientFk} `

    const createTemplateByPlan = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT
    })
    const planList = createTemplateByPlan[0]
    const schemaName = clientName[0].name
    const createSchema = `CREATE SCHEMA ${schemaName}`
    await sequelizeConfig.query(createSchema)
    for (let i = 0; i < planList.noOfItemTypes; i++) {
      const templateName = "Product_" + i + "_" + clientName[0].name
      clientId = clientFk
      tempalateName = templateName
      await this.itemcontroller.create(clientFk, templateName, schemaName)
    }
    Logger.log("End of UserService : createTemplateByPlan ")
    return createTemplateByPlan
  }

  public async getRoleNameByID(id: string): Promise<Role[]> {
    Logger.log("Start of UserService : getRoleNameByID :id", id)
    const roleId = id
    const getRoleNameByID = await this.roleModel.findAll({ where: { id: roleId } })
    Logger.log(
      "End of UserService : getRoleNameByID :response",
      getRoleNameByID
    )
    return getRoleNameByID
  }

  public async getRoleName(roleId: number): Promise<string> {
    Logger.log("Start of UserService : getRoleName :roleId", roleId)
    let roleName: Array<{ name: string }> = []
    let nameRole: string
    const query = `SELECT name FROM roles WHERE id = ${roleId}`
    roleName = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT
    })
    if (roleName && roleName.length > 0) {
      nameRole = roleName[0].name
    }
    Logger.log("End of UserService : getRoleName :response", roleName)
    return nameRole
  }

  public async retriveUserName(userPk): Promise<string> {
    Logger.log("Start of UserService : getUserName :userPk", userPk)
    let userName: Array<{ username: string }> = []
    if (userPk) {
      const query = `SELECT username FROM users WHERE id = ${userPk}`
      userName = await sequelizeConfig.query(query, {
        type: QueryTypes.SELECT
      })
      if (userName.length > 0) {
        this.userName = userName[0].username
      }
    }
    Logger.log("End of UserService : getUserName :response", this.userName)
    return this.userName
  }

  public async generateUserMenuFile(userPk: number): Promise<void> {
    Logger.log("Start of UserService : generateUserMenuFile :userPk", userPk)
    const query = ' SELECT label FROM menus WHERE "clientFk" IS NULL '
    const userMenus = await sequelizeConfig.query(query, {
      type: QueryTypes.SELECT
    })

    this.collections = userMenus.map(
      ({ label }) => (`{ "key": "${label}" ,"value": "${label}"}`)
    )
    console.log(this.collections)
    const userName = await this.retriveUserName(userPk)
    //passing the path config key and file name
    if (typeof userName !== "undefined") {
      fs.writeFile(
        `${config.adminSystemUrl}/${userName}.json`,
        "[" + `${this.collections}` + "]",
        function (error) {
          if (error) {
            error
          } else {
            Logger.log("Successfully created json file", userName + ".json")
          }
        }
      )
    }
    Logger.log("End of UserService : generateUserMenuFile :response", userName)
  }

  public async readUserFile(username: string): Promise<User> {
    Logger.log("Start of UserService : readUserFile :name", username)
    const userName = username
    const data = fs.readFileSync(`${config.adminSystemUrl}/${userName}.json`)
    const userdata = JSON.parse(data.toString())
    Logger.log("End of UserService : readUserFile :response", userdata)
    return userdata
  }

  public async getPlan(planId: string): Promise<Plan[]> {
    Logger.log("Start of UserService : getPlan :planId", planId)
    const id = planId
    const getPlan = await this.planModel.findAll({ where: { id: id } })
    Logger.log("End of UserService : getPlan :response", getPlan)
    return getPlan
  }

  public async getClient(id: number): Promise<Client[]> {
    Logger.log("Start of UserService : getClient :id", id)
    const getClient = await this.clientModel.findAll({ where: { id: id } })
    Logger.log("End of UserService : getClient :response", getClient)
    return getClient
  }

  public async saveData(payload: ISaveData, username: string): Promise<string> {
    Logger.log("Start of UserService : saveData :username", username)
    const userName = username
    const randomdata = JSON.stringify(payload)
    fs.writeFile(
      `${config.adminSystemUrl}/${userName}.json`,
      randomdata,
      error => {
        // Error checking
        if (error) {
          Logger.log("New data is Not added")
        } else {
          Logger.log("New data added")
        }
      }
    )
    Logger.log("End of UserService : saveData :response", randomdata)
    return randomdata
  }

  public async addingUserMenuNewData(
    payload: Menu,
    id: string
  ): Promise<string> {
    Logger.log("Start of UserService : addingUserMenuNewData :userPk", id)
    const userPk1 = id
    const newMenuData = payload
    //calling getUserName function for getting username
    const userName = await this.retriveUserName(userPk1)
    const key = Object.keys(newMenuData)
    const value = Object.values(newMenuData)
    //passing the path config key and file name
    const addingUserMenuNewData = fs.readFileSync(
      `${config.adminSystemUrl}/${userName}.json`
    )
    const userdata = JSON.parse(addingUserMenuNewData.toString())
    // jsonData.push(userdata)
    userdata[`${key}`] = `${value}`
    const jsonDataValue = JSON.stringify(userdata)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await fs.writeFile(
      `${config.adminSystemUrl}/${userName}.json`,
      jsonDataValue,
      error => {
        // Error checking
        if (error) {
          Logger.log("New data is Not added")
        } else {
          Logger.log("New data added")
        }
      }
    )
    Logger.log(
      "End of UserService : addingUserMenuNewData :response",
      jsonDataValue
    )
    return jsonDataValue
  }

  public async saveClientStaff(
    clientName: string,
    payload: ISaveData
  ): Promise<ISaveData> {
    Logger.log("Start of UserService : saveClientStaff :clientName", clientName)
    let staffRecord;
    staffRecord = payload
    staffRecord.clientname = clientName
    const staff = payload
    const hash = crypto.createHash("md5").update(payload.password).digest("hex")
    payload.password = hash
    payload.esUrl =
      elasticSearchConfig.transport._config.host +
      "/rack/<RACK_NAME>_<RACK_PK>?routing=" +
      payload.username +
      "/refresh=true"

    const createStaff = await this.userModel.create(staff)
    const createProfile = {} as UserProfile
    createProfile.userName = createStaff.username
    createProfile.email = createStaff.email
    createProfile.phone = createStaff.phone
    createProfile.password = createStaff.password
    createProfile.user_fk = createStaff.id
    await this.createProfileObject(createProfile)
    const addStore = {} as UserStore
    if (payload.selectedStore.length > 0) {
      payload.selectedStore.forEach(async store => {
        addStore.storeId = store.storeId
        addStore.storeName = store.storeName
        addStore.userFk = createStaff.id
        await this.userStoreService.addStaffToStore(addStore)
      })
    }


    await this.createNotificationRegisterForStaff(staffRecord)
    return createStaff
  }
  public async createNotificationRegisterForStaff(
    data,
    notificationType?: string
  ) {
    notificationType = "STAFF-REGISTERED"
    const notificationRecord = await this.createNotification(data, notificationType)
    await this.notificationService.sendStaffRegistrationMail(notificationRecord, notificationRecord.content)
  }

  public async createNotificationQuantityAlert(
    data,
    notificationType?: string
  ) {
    notificationType = "QUANTITY-ALERT"
    await this.createNotification(data, notificationType)
  }

  public async contactUs(contactUsData: ContactUs): Promise<void> {
    Logger.log(
      "Start of UserService : contactUs :response"
    )
    const uid = new ShortUniqueId({ length: 10 });
    contactUsData.ticketNo = uid.rnd()
    let message = {}
    const notificationData = await this.createContuctUsNotification(contactUsData)
    if(contactUsData.subject === 'Enquiry'){
      message = {
        from: config.fromEmailAddress,
        to: config.fromEmailAddress,
        subject: config.enquirySubject + " - " + contactUsData.ticketNo + " - " + '[Please Do Not Change The Subject]',
        template: "contactus",
        context: {
          contactUsData
        }
      }
    } else {
      message = {
        from: config.fromEmailAddress,
        to: config.fromEmailAddress,
        subject: config.ticketSubject + " - " + contactUsData.ticketNo + " - " + '[Please Do Not Change The Subject]',
        template: "ticket",
        context: {
          contactUsData
        }
      }
    }
    
    await this.notificationService.sendMail(message, notificationData)
    Logger.log(
      "End of UserService : contactUs :response"
    )
  }

  private async createContuctUsNotification(data): Promise<Notification> {
    Logger.log(
      "Start of UserService : createContuctUsNotification :response"
    )
    const status = "NEW"
    const notification = {} as Notification
      ; (notification.notificationType = "CONTACT-US"),
        (notification.email = config.companyEmail),
        (notification.status = status),
        (notification.userFk = data.id),
        (notification.content = data),
        (notification.noOfRetry = 3)
    Logger.log(
      "End of UserService : createContuctUsNotification :response"

    )
    return await this.userNotification.saveNotification(notification)

  }
}
