/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * This is add-edit-notification.component.ts file
 */
import {Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {NotificationModel} from '../models/notifi.model'
import {NotificationService} from '../notification.service'
import { AlertService } from '../components/_alert/alert.service'
@Component({
  selector: 'app-add-edit-notification',
  templateUrl: './add-edit-notification.component.html',
  styleUrls: ['./add-edit-notification.component.css']
})
export class AddEditNotificationComponent implements OnInit {
  id?: number
  addForm?: boolean
  notificationForm: FormGroup
  notification: NotificationModel = {
    name: '',
    notificationType: '',
    storeFk: 0
  }
  notificationSetting: any = [
    {
      id: 0,
      settingName: '',
      notificationType: 'Email',
      isEscalationRequired: true,
      storeFk: 0,
      noOfRemainder: '1 Day',
      timeToEscalate: '1 Day',
      to: '',
      escalationType: ''
    }
  ]
  escalation = {}
  isEscalation = false
  submitted = false
  storeId: number
  notiID: number
  notificationType = ''
  isEscalationRequired = true
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  }

  day: string[] = ['1 Day', '2 Days', '3 Days']
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.notiID = this.route.snapshot.params['id']
    this.fetchNotificationSettingById(this.notiID)
    if(this.route.snapshot.params['storeId'] != undefined){
      this.storeId = this.route.snapshot.params['storeId']
    }    
    this.getDays()
    this.notificationForm = this.formBuilder.group({
      settingName: ['', Validators.required],
      notificationType: ['', Validators.required],
      to: '',
      storeFk: this.storeId,
      isEscalationRequired: false,
      noOfRemainder: '',
      timeToEscalate: '',
      escalationType: ''
    })
    this.id = this.route.snapshot.params.id
    this.addForm = !this.id
  }

  get f(): {[key: string]: AbstractControl} {
    return this.notificationForm.controls
  }

  getDays(): any {
    return this.day
  }

  fetchNotificationSettingById(id): void {
    this.notificationService
      .fetchNotificationSettingandEscalation(id)
      .subscribe(response => {
        this.notificationSetting = response
      })
  }

  onChangeEscalationLevel(e): void {
    this.notificationForm.value.escalationType = e
  }

  changenotificationType(e): void {
    this.notificationForm.value.notificationType = e
  }

  onChangeRemainder(e): void {
    this.notificationForm.value.noOfRemainder = e
  }

  onChangeTimeInterval(e): void {
    this.notificationForm.value.timeToEscalate = e
  }

  onCheckboxChange(e): void {
    if (e.target.checked) {
      this.isEscalation = true
      this.isEscalationRequired = false
    } else {
      this.isEscalation = false
      this.isEscalationRequired = true
    }
  }

  saveNotification(): void {
    this.submitted = true
    // if (this.notificationForm.invalid) {
    //   return
    // }
    this.notificationForm.value.isEscalationRequired = this.isEscalation
    this.notificationForm.value.timeToEscalate = '1 Day'
    this.notificationForm.value.noOfRemainder = '1 Day'
    this.notificationForm.value.notificationType = 'Email'
    this.notificationService
      .createNotificationSetting(this.notificationForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/fetchNotification', this.storeId])
        },
        error => {
          this.handleError(error.message)
        }
      )
  }

  handleError(err: ErrorEvent): void {
    alert(err)
  }

  fetchNotification(): void {
    if (this.storeId == null) {
      window.history.back()
    } else {
      this.router.navigate(['/fetchNotification', this.storeId])
    }
  }

  updateNotificationById(): void {
    this.submitted = true
    this.notificationSetting.timeToEscalate = '1 Day'
    this.notificationSetting.noOfRemainder = '1 Day'
    this.notificationSetting.notificationType = 'Email'

    this.notificationService
      .updateNotificationSettings(
        this.route.snapshot.params.id,
        this.notificationSetting
      ).subscribe(
        () => {
          this.alertService.success(
            'Notification Setting updated successfully',
            this.options
          )          
          this.router.navigate(['/fetchNotification', this.notificationSetting[0].storeFk])
        },
        error => {
          this.handleError(error.message)
        }
      )    
      
  }
}
