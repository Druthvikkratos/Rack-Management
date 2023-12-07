/*
 * This is item-listing.component.ts
 */
import {SelectionModel} from '@angular/cdk/collections'
import {Component, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {FormService} from '../../services/app.form.service'
import {User} from '../../models/user.model'
import {Template} from '../../models/template.model'
import {ActivatedRoute} from '@angular/router'
import {MenuService} from '../../services/menu.service'
import {Tray} from '../../models/tray.model'
import {FormlistQuantityComponent} from '../../formlist-quantity/formlist-quantity.component'

@Component({
  selector: 'item-listing',
  templateUrl: 'item-listing.component.html'
})
export class ItemListingComponent {
  @ViewChild('child') child: FormlistQuantityComponent
  displayedColumns: string[] = []
  dataSource = new MatTableDataSource<Template>()
  selection = new SelectionModel<Template>(true, [])
  UserObj: User = {}
  clientFk = 0
  formList = false
  templateList: Template[]
  name: string
  id: number
  trayId: number
  isQuantity: boolean
  rackId: string
  rackName: string
  dropdownBtnText: string
  dropDown = false
  value: string
  product: string
  switchButtonProductAndTray: boolean
  showTraybutton = false
  trayObject: Tray = {
    id: 0,
    trayLayoutId: '',
    x: 0,
    y: 0,
    h: 0,
    w: 0,
    color: '',
    quantity: 0,
    rack_fk: 0,
    name: '',
    searchable: false,
    img: '',
    cssClass: ''
  }
  quantity: string
  schemaName: string
  tray: string
  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'))
    this.clientFk = this.UserObj.clientFk
    this.retrieveTemplates()
    this.trayId = this.route.snapshot.params.trayId
    this.rackId = this.route.snapshot.params.rackId
    this.rackName = this.route.snapshot.params.rackName
    this.value = localStorage.getItem('item')
    this.product = localStorage.getItem('product')
    this.tray = localStorage.getItem('tray')
    if (this.tray === null) {
      this.tray = 'tray'
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear()
      return
    }

    this.selection.select(...this.dataSource.data)
  }

  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`
  }

  retrieveTemplates(): void {
    this.formService.getAll(this.clientFk).subscribe(
      data => {
        this.dataSource.data = data
        this.templateList = this.dataSource.data
      },
      error => {
        this.handleError(error.message)
      }
    )
  }

  handleError(err: ErrorEvent): void {
    alert(err)
  }

  fetchFormList(formName: string, formId: number): void {
    this.showTraybutton = true
    this.formList = true
    this.name = formName
    this.isQuantity = true
    this.id = formId
    localStorage.setItem('tempname', formName)
  }
  select(value: string): void {
    this.dropDown = true
    this.dropdownBtnText = value
  }

  retriveItems(): void {
    this.switchButtonProductAndTray = !this.switchButtonProductAndTray
    if (this.switchButtonProductAndTray) {
      this.child.retriveItems()
    } else {
      this.child.retriveItems()
    }
  }
}
