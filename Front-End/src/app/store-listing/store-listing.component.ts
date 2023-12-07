/*
 * This is store-listing.component.ts
 */
import {Component, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {StoreService} from '../store.service'
import swal from 'sweetalert2'
import {MatPaginator} from '@angular/material/paginator'
import {AlertService} from '../components/_alert'
import {Router} from '@angular/router'
import {User} from '../models/user.model'
import {Store} from '../models/store.model'
import {LogService} from '../services/log.service'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-store-listing',
  templateUrl: './store-listing.component.html',
  styleUrls: ['./store-listing.component.css']
})
export class StoreListingComponent implements OnInit {
  UserObj: User = {}
  message = 'Store Deleted Successfully'
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  }
  value: string
  stores: Store[] = []
  displayedColumns: string[] = ['storeName', 'address', 'actions']
  dataSource = new MatTableDataSource<Store[]>()
  storeSupport = 'store_support'
  totalStoresCount = environment.totalNoOfStores
  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'))
    this.getStores(this.UserObj.clientFk)
    this.value = localStorage.getItem('Stores')
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  getStores(client_fk: number): void {
    this.storeService
      .fetchAllStoresByClientFK(client_fk)
      .subscribe((data: undefined) => {
        this.dataSource.data = data
      })
  }

  deleteStore(id: number): void {
    swal({
      title: 'Please Confirm!',
      text: 'By deleting this store it will also deletes related Notification settings of this Store, Do you want to procced?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then(result => {
      if (result.value) {
        this.deleteStoreById(id)
        this.reload()
      }
    })
  }
  deleteStoreById(id): void {
    this.logger.log('Start of StoreListing : deleteStoreById :id', id)
    this.storeService.deleteStoreById(id).subscribe(
      () => {
        this.alertService.success(this.message, this.options)
        this.getStores(this.UserObj.clientFk)
      },
      error => {
        this.alertService.error(error.error.message, this.options)
        return error
      }
    )
    this.logger.log('End of StoreListing : deleteStoreById')
  }

  fetchNotificationsBelongsToStore(storeId): void {
    this.logger.log(
      'Start of StoreListing : fetchNotificationsBelongsToStore :storeId',
      storeId
    )
    this.router.navigate(['/fetchNotification', storeId])
    this.logger.log('End of StoreListing : fetchNotificationsBelongsToStore')
  }

  reload(): void {
    window.location.reload()
  }

  storeLimitPopUp(): void{
    swal({
      title: 'Stores limit alert!',
      text: 'You cannot add stores more than' + " " + this.totalStoresCount ,
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#00B96F',
      confirmButtonText: 'Ok'
    })
  }
}
