/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-undef */
/*
 * This is contactus.component.ts
 */
import {Component, Input, OnInit} from '@angular/core'
import {UserService} from '../../services/user.service'
import {Support} from '../../../app/models/support.model'
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  triggerOrigin: any
  isOpen = false
  support: Support = {}
  @Input() infoKey: string;

  constructor(private userService: UserService) {}

  toggle(trigger: any): void {
    this.retrieveDescription()
    this.triggerOrigin = trigger
    this.isOpen = !this.isOpen
  }

  retrieveDescription(): void {
    this.userService.fetchDescription(this.infoKey).subscribe(data => {
      this.support = data
    })
  }
}
