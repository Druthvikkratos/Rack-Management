/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-concat */
/*
 * This is user.service.ts
 */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../environments/environment'
import {User} from '../models/user.model'
import {Staff} from '../models/staff.model'
import {Plan} from '../models/plan.model'
import {Notification} from '../models/notification.model'
import {Client} from '../models/client.model'
import {Role} from '../models/role.model'
import {Elasticsearch} from '../models/eslaticSearch.model'
import {Support} from '../models/support.model'
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(data: User): Observable<User> {
    return this.http.post(`${baseUrl}/api/user`, data)
  }

  async loginAuth(data: User): Promise<any> {
    return await this.http
      .post(`${baseUrl}/api/user/auth` + `/login`, data)
      .toPromise()
  }

  async login(data: User): Promise<User> {
    return await this.http
      .post<User>(`${baseUrl}/api/user` + `/login`, data)
      .toPromise()
  }

  createClient(data: Client): Observable<Client> {
    return this.http.post(`${baseUrl}/api/user` + `/client`, data)
  }

  resetPassword(data: User): Observable<User> {
    return this.http.post(`${baseUrl}/api/user/client/resetPassword`, data)
  }

  backendValidation(value: string, type: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${baseUrl}/api/user/client/validation/${value}/${type}`
    )
  }

  saveClientStaff(clientName: string, data: Staff): Observable<Staff> {
    return this.http.post(
      `${baseUrl}/api/user/client/staff/save/${clientName}`,
      data
    )
  }

  getStaffRole(): Observable<Staff> {
    return this.http.get(`${baseUrl}/api/user/client/staff/role`)
  }

  getClientStaffList(clientFk: number, roleId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${baseUrl}/api/user/client/staff?clientFk=${clientFk}&roleId=${roleId}`
    )
  }

  getClientName(clientFk: number): Observable<Client> {
    return this.http.get(`${baseUrl}/api/user/client/name?clientFk=${clientFk}`)
  }

  get(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/api/user/client/staff/${id}`)
  }

  updateClientStaff(id: number, data: Staff): Observable<Staff> {
    return this.http.put(`${baseUrl}/api/user/client/staff/update/${id}`, data)
  }

  delete(id: number): Observable<Staff> {
    return this.http.delete(`${baseUrl}/api/user/client/staff/delete/${id}`)
  }

  getPlansList(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${baseUrl}/api/user/client/plans`)
  }

  getRoleNameByID(roleId: number): Observable<Role[]> {
    return this.http.get<Role[]>(`${baseUrl}/api/user/role?roleId=${roleId}`)
  }

  getPlanByID(planId: number): Observable<Plan> {
    return this.http.get<Plan>(`${baseUrl}/api/user/plan?planId=${planId}`)
  }
  getClientList(clientId: number): Observable<Client> {
    return this.http.get(`${baseUrl}/api/user/client/fetchdata/${clientId}`)
  }

  fetchNotificationByUserFk(userFk: number): Observable<Notification> {
    return this.http.get(
      `${baseUrl}/api/notification/fetchNotificationByUserFk/${userFk}`
    )
  }

  saveData(data, username: string) {
    return this.http.post(`${baseUrl}/api/user/translateData/${username}`, data)
  }
  getAllMenuData(username: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/user/getData/${username}`)
  }

  updateUserElasticSearchUrl(
    userPk: number,
    elasticSearch: Elasticsearch
  ): Observable<Elasticsearch> {
    return this.http.put<Elasticsearch>(
      `${baseUrl}/api/user/updateUserElasticSearchUrl/${userPk}`,
      elasticSearch
    )
  }

  fetchNotificationByEmail(email: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${baseUrl}/api/notification/fetchNotificationByEmail/${email}`
    )
  }

  updateNewNotificationToOld(notificationIDs: number[]): Observable<Notification[]> {
    const ids: number[] = notificationIDs
    return this.http.put<Notification[]>(
      `${baseUrl}/api/notification/updateNewNotificationToOld/${ids}`,null
    )
  }

  fetchNotificationByStoreId(userFk: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${baseUrl}/api/notification/fetchNotificationByuserFk/${userFk}`
    )
  }

  fetchDescription(title: string): Observable<Support> {
    return this.http.get<Support>(`${baseUrl}/api/support/${title}`)
  }

  contactUs(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/user` + `/contactus`, data)
  }
}
