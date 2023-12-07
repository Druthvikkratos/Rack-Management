/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable i18n-text/no-en */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable github/array-foreach */
import {Component, Input, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {AlertService} from '../components/_alert'
import {FormService} from '../services/app.form.service'
import {RackService} from '../services/rack.service'
import * as $ from 'jquery'
import {UserService} from '../services/user.service'
import {MatPaginator} from '@angular/material/paginator'
import {NotificationService} from '../notification.service'
//import {Template} from '@angular/compiler/src/render3/r3_ast'
import {User} from '../models/user.model'
import {Notification} from '../models/notification.model'
import {NotificationSetting} from '../models/notificationSetting.model'
import swal from 'sweetalert2'
import {LogService} from '../services/log.service'
@Component({
  selector: 'app-formlist-quantity',
  templateUrl: './formlist-quantity.component.html',
  styleUrls: ['./formlist-quantity.component.css']
})
export class FormlistQuantityComponent implements OnInit {
  trayItems = {
    quantity: 0,
    trayId: 0,
    formId: 0,
    rackId: 0,
    userFk: 0,
    tempId: 0,
    upperLimit: 0,
    lowerLimit: 0,
    notificationSettngFk: 0
  }

  @Input()
  name: string

  @Input()
  id: number

  @Input()
  isQuantity: boolean

  @Input()
  trayId: number

  @Input()
  rackId: number

  @Input()
  rackName: string
  //this rowDataList stores a dynamically generated column so any is used
  rowDataList: any = []
  //this trayData stores a dynamically generated column so any is used
  trayData: any
  templateName: string
  //filteredTemplates: Template[]
  //this trayViewData stores a dynamically generated column so any is used
  trayViewData: any = []
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  }
  switchButtonItemAndTray: boolean
  elasticSearch = {
    name: '',
    rackId: 0,
    username: '',
    attributes: [{}]
  }

  notification = {
    id: 0,
    settingName: '',
    location: ''
  }
  //this datasource stores a dynamically generated column so any is used
  dataSource = new MatTableDataSource<any>()
  pageSize = 5
  currentPage = 0
  quantity: string
  upperLimit: number
  lowerLimit: number
  notificationSettngFk: number
  schemaName: string
  displayedColumns: string[] = []

  UserObj: User = {}

  text: any
  notificationList: Notification[]
  notificationSetting: NotificationSetting = {
    settingName: '',
    notificationType: '',
    isEscalationRequired: false,
    storeFk: 0
  }
  tray: string

  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(
    private formService: FormService,
    private rackService: RackService,
    private alertService: AlertService,
    private userService: UserService,
    private notificationService: NotificationService,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'))
    this.templateName = localStorage.getItem('tempname')
    this.elasticSearch.username = this.UserObj.username
    this.trayItems.userFk = this.UserObj.id
    this.retrieveForms()
    this.fetchAllNotifications()
    this.tray = localStorage.getItem('tray')
    if(this.tray === null){
      this.tray = 'tray'
    }
  }

  fetchAllNotifications(): void {
    this.notificationService.fetchALLNotification().subscribe(response => {
      this.notificationList = response
    })
  }

  onLowerLimit(lowerLimit): void {
    this.lowerLimit = lowerLimit.target.value
  }

  onUpperLimit(upperLimit): void {
    this.upperLimit = upperLimit.target.value
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  retrieveForms(): void {
    this.schemaName = sessionStorage.getItem('clientName')
    this.formService
      .getAllProductsByItemTempId(
        this.id,
        this.name,
        this.schemaName,
        this.currentPage,
        this.pageSize
      )
      .subscribe(data => {
        this.extractData(data)
      })
  }

  onKeyUp(x): void {
    // appending the updated value to the variable
    this.text = x.target.value
  }

  fetchAllProducts(): void {
    this.formService
      .getAllProductsByItemTempId(
        this.id,
        this.name,
        this.schemaName,
        this.currentPage,
        this.pageSize
      )
      .subscribe(data => {
        this.editFormList(data)
      })
  }

  addItemsToTray(formId): void {
    this.trayItems.quantity = parseInt(this.text)
    this.trayItems.lowerLimit = this.lowerLimit
    this.trayItems.upperLimit = this.upperLimit
    this.trayItems.formId = formId
    this.trayItems.trayId = this.trayId
    this.trayItems.rackId = this.rackId
    this.trayItems.tempId = this.id
    this.trayItems.notificationSettngFk = this.notificationSettngFk
    this.rackService
      .fetchTrayTemplateAndFormById(
        this.trayItems.trayId,
        this.trayItems.tempId,
        this.trayItems.formId
      )
      .subscribe(response => {
        if (response.length > 0) {
          this.text = $('#updateQuantity').val()
          this.trayItems.quantity = parseInt(this.text)
          this.rackService
            .updateTrayItem(
              response[0].id,
              this.templateName,
              this.schemaName,
              this.trayItems
            )
            .subscribe(
              () => {
                this.alertService.success(
                  'Items Updated Successfully To Tray',
                  this.options
                )
              },
              error => {
                this.alertService.error(error.error.message, this.options)
              }
            )
        } else {
          this.rackService
            .createTrayItems(this.trayItems, this.templateName, this.schemaName)
            .subscribe(
              response => {
                this.alertService.success(
                  'Items Added Successfully To Tray',
                  this.options
                )
                this.elasticSearch.name = this.rackName
                this.elasticSearch.rackId = this.trayItems.rackId
                // this.filteredTemplates = response.filter(
                //   templateForms => templateForms.id === formId
                // )
                //this.elasticSearch.attributes = this.filteredTemplates[0].attributes
                // this.userService
                //   .updateUserElasticSearchUrl(
                //     this.UserObj.id,
                //     this.elasticSearch
                //   )
                //   .subscribe(() => {})
              },
              error => {
                this.alertService.error(error.error.message, this.options)
              }
            )
        }
      })
  }

  editForm(): void {
    this.formService
      .getAllProductsByItemTempId(
        this.id,
        this.name,
        this.schemaName,
        this.currentPage,
        this.pageSize
      )
      .subscribe(data => {
        this.formListing(data)
      })
  }

  formListing(serverData): void {
    const rowDataList: any = []
    serverData.forEach(dbRecord => {
      let rowdata
      // Prepare Row Data
      rowdata = Object.assign({id: dbRecord.id})

      // Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        const colVal = dbRecordCol.value ? dbRecordCol.value : ''
        const colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, {[colLabel]: colVal})
      })
      rowdata = Object.assign(rowdata, {
        Total_No_Of_Quantites: dbRecord.quantity
      })
      rowdata = Object.assign(rowdata, {Quantity: this.quantity})

      rowdata = Object.assign(rowdata, {Actions: ``})
      //push a record
      rowDataList.push(rowdata)
    })

    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    this.dataSource.data = rowDataList
  }
  private extractData(serverData): void {
    // Prepare Row Data

    // rowdata = Object.assign(rowdata, {"name":dbRecord.name})
    if (this.isQuantity) {
      this.fetchTrayView(serverData)
    } else {
      this.formListing(serverData)
    }
  }
  fetchTrayView(trayData): void {
    trayData.forEach(dbRecord => {
      let rowdata
      this.rackService
        .fetchTemplateAndTrayById(this.id, this.trayId)
        .subscribe(response => {
          if (response.length > 0) {
            rowdata = Object.assign({Id: dbRecord.id})
            for (let i = 0; i < response.length; i++) {
              if (dbRecord.id === response[i].formId) {
                this.quantity = response[i].quantity
                dbRecord.attributes.forEach(dbRecordCol => {
                  const colVal = dbRecordCol.value ? dbRecordCol.value : ''
                  const colLabel = dbRecordCol.label
                  rowdata = Object.assign(rowdata, {[colLabel]: colVal})
                })
                rowdata = Object.assign(rowdata, {
                  Total_No_Of_Quantites: dbRecord.quantity
                })
                rowdata = Object.assign(rowdata, {
                  Quantity: this.quantity
                })
                this.getUpperAndLowerLimit(dbRecord.id, this.trayId)
                rowdata = Object.assign(rowdata, {Actions: ``})
                this.rowDataList.push(rowdata)
                this.displayedColumns = Object.getOwnPropertyNames(
                  this.rowDataList[0]
                )
                this.dataSource.data = this.rowDataList
              }
            }
          }
        })
    })
  }

  getUpperAndLowerLimit(formId: number, trayId: number): void {
    this.formService.fetchUpperAndLowerLimit(formId, trayId).subscribe(data => {
      data
      this.upperLimit = data[0].upperLimit
      this.lowerLimit = data[0].lowerLimit
      this.notificationSettngFk = data[0].notificationSettngFk
    })
  }

  updateUpperAndLowerLimit(formId): void {
    this.trayItems.lowerLimit = this.lowerLimit
    this.trayItems.upperLimit = this.upperLimit
    this.trayItems.formId = formId
    this.trayItems.trayId = this.trayId
    this.trayItems.rackId = this.rackId
    this.trayItems.tempId = this.id
    this.trayItems.notificationSettngFk = this.notificationSettngFk
    this.rackService
      .fetchTrayTemplateAndFormById(
        this.trayItems.trayId,
        this.trayItems.tempId,
        this.trayItems.formId
      )
      .subscribe(response => {
        if (response.length > 0) {
          this.templateName = localStorage.getItem('tempname')
          this.rackService
            .updateLowerAndUpperLimit(response[0].id, this.trayItems)
            .subscribe(
              () => {
                this.alertService.success(
                  'Items Updated Successfully To Tray',
                  this.options
                )
              },
              error => {
                this.alertService.error(error.error.message, this.options)
              }
            )
        }
      })
  }

  editFormList(serverData): void {
    const rowDataList: any = []
    serverData.forEach(dbRecord => {
      let rowdata
      // Prepare Row Data
      rowdata = Object.assign({Id: dbRecord.id})

      // Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        const colVal = dbRecordCol.value ? dbRecordCol.value : ''
        const colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, {[colLabel]: colVal})
      })
      rowdata = Object.assign(rowdata, {
        Total_No_Of_Quantites: dbRecord.quantity
      })
      rowdata = Object.assign(rowdata, {Quantity: ``})
      rowdata = Object.assign(rowdata, {Actions: ``})
      // push a record
      rowDataList.push(rowdata)
    })
    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    this.rackService
      .fetchTemplateAndTrayById(this.id, this.trayId)
      .subscribe(response => {
        this.dataSource.data = this.filterObjects(rowDataList, response)
        this.dataSource.data = this.dataSource.data.sort((a, b) => b.id - a.id)
      })
  }

  filterObjects = (arr1, arr2) => {
    let res = []
    res = arr1.filter(formList => {
      return !arr2.find(retrievedFromDb => {
        return retrievedFromDb.formId === formList.id
      })
    })
    return res
  }

  save(formId): void {
    this.trayItems.quantity = parseInt(this.text)
    this.trayItems.formId = formId
    this.trayItems.trayId = this.trayId
    this.trayItems.rackId = this.rackId
    this.trayItems.tempId = this.id
    this.rackService
      .createTrayItems(this.trayItems, this.templateName, this.schemaName)
      .subscribe(() => this.alertService.success('Tray Saved Successfully'))
  }
  editTrayItem(formId): void {
    this.trayItems.quantity = +this.quantity
    this.trayItems.formId = formId
    this.trayItems.trayId = this.trayId
    this.trayItems.rackId = this.rackId
    this.trayItems.tempId = this.id
    this.rackService
      .updateTrayItem(
        this.trayId,
        this.templateName,
        this.schemaName,
        this.trayItems
      )
      .subscribe(() => this.alertService.success('Tray Updated Successfully'))
    window.location.reload()
  }

  retriveItems(): void {
    this.switchButtonItemAndTray = !this.switchButtonItemAndTray
    if (this.switchButtonItemAndTray === false) {
      this.dataSource.data = this.rowDataList
    } else {
      this.fetchAllProducts()
    }
  }

  deleteTraysItem(formId): void {
    this.rackService.deleteTrayItem(formId).subscribe(responce => responce)
  }
  async deleteItem(id): Promise<void> {
    this.logger.log('Start of RackListComponent : deleteRack :id', id)
    const alert = await swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    })
    if (alert.value) {
      this.deleteTraysItem(id)
      location.reload()
    }
  }
}
