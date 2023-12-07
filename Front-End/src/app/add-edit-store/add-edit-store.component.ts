/*
 * This is add-edit-store.component.ts file
 */
import {Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Store} from '../models/store.model'
import {User} from '../models/user.model'
import {StoreService} from '../store.service'
import { environment } from 'src/environments/environment'
// import LocationPicker from 'location-picker'

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.css']
})
export class AddEditStoreComponent implements OnInit {
  id?: number
  addForm?: boolean
  store: Store = {
    storeId: 0,
    storeName: '',
    location: '',
    latitude: 0,
    longitude: 0
  }
  stores
  UserObj: User = {}
  storeObj: any = {
    storeId: 0,
    storeName: '',
    address: '',
    latitude: 0,
    longitude: 0
  }
  totalNoOfStores = environment.totalNoOfStores
  constructor(
    private router: Router,
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  loading = false
  submitted = false
  storeForm: FormGroup
  value: String
  // lp: LocationPicker

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'))
    this.storeForm = this.formBuilder.group({
      storeName: ['', Validators.required],
      address: ['', Validators.required],
      latitude: [],
      longitude: [],
      client_fk: this.UserObj.clientFk
    })
    if (this.route.snapshot.params.storeId) {
      this.getStoreById(this.route.snapshot.params.storeId)
    }
    this.id = this.route.snapshot.params.storeId
    this.addForm = !this.id
    this.value = localStorage.getItem('Stores')
    // this.lp = new LocationPicker('map', {
    //   setCurrentPosition: true,
    //   lat: this.storeObj.latitude,
    //   lng: this.storeObj.longitude
    // })
  }

  get f(): {[key: string]: AbstractControl} {
    return this.storeForm.controls
  }

  saveStore(): void {
    this.submitted = true
    if (this.storeForm.invalid) {
      return
    }
    if (this.route.snapshot.params.storeId) {
      return this.updateStoreById()
    }
    this.storeService.createStore(this.storeForm.value).subscribe(
      () => {
        this.router.navigate(['/stores'])
      },
      error => {
        this.handleError(error.message)
      }
    )
  }

  getStoreById(storeId): void {
    this.storeService.getStoreById(storeId).subscribe(response => {
      this.storeObj = response
    })
  }

  handleError(err: ErrorEvent): void {
    alert(err)
  }

  updateStoreById(): void {
    this.submitted = true
    if (this.storeForm.invalid) {
      return
    }
    this.storeService
      .updateStore(this.route.snapshot.params.storeId, this.storeForm.value)
      .subscribe(
        () => {
          this.submitted = true
          this.router.navigate(['/stores'])
        },
        error => {
          this.handleError(error.message)
        }
      )
  }

  // setLocation(): void {
  //   console.log(this.lp.getMarkerPosition())
  // }
}
