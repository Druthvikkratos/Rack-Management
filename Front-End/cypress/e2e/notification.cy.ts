/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-undef */
/* eslint-disable i18n-text/no-en */
/* eslint-disable filenames/match-regex */
/* eslint-disable no-console */

import {userAdmin, staffRecord2, updateStaffRecord,timeOut, notificationSettingRecord} from './e2e-constants.cy'
import {environment} from 'src/environments/environment'
const rackSelect = {
  rackName: 'r1c1'
}
const selectProduct = {
  product: 'Product_2_' + userAdmin.username
}

beforeEach(() => {
  cy.request({
    method: 'POST',
    url: environment.authloginUrl,
    body: {
      user: {
        username: userAdmin.username,
        password: userAdmin.password
      }
    }
  }).then(resp => {
    localStorage.setItem('tokens', resp.body.access_token)
  })
})
describe('Notification > CRUD', () => {
  it(' Login > FirstStaff', () => {
    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)
    // cy.get('[id="1"]').contains('Racks').click({force: true})
    // cy.wait(timeOut.delay_2)
    // cy.contains('Listing')
    // cy.get('[id="view_rack"]').eq(0).click({force: true})
    // cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
    // cy.get('[id="add_items"]').click({force: true})
    // cy.get('[id="product-dropdownMenu"]').click()
    // cy.get('[id="selectTemplates"]')
    //   .contains(selectProduct.product)
    //   .click({force: true})
    // cy.wait(timeOut.delay_2)
    // if(cy.get('[id="switch_button"]').contains(" switch to product view")){
    //   cy.get('[id="switch_button"]').contains(" switch to product view").click()
    // cy.get('[id="edit_notification"]').eq(0).click({force: true})
    // cy.wait(timeOut.delay_2)
    // cy.window().contains('Notification Modal')
    // cy.wait(timeOut.delay_2)
    // cy.get('[id="lowerLimit"]').eq(0).clear()
    // cy.get('[id="higherLimit"]').eq(0).clear()
    // cy.get('[ id="lowerLimit"]').eq(0).type('6')
    // cy.get('[ id="higherLimit"]').eq(0).type('8')
    // cy.get('[id="select_notifiction"]')
    //   .eq(0)
    //   .click()
    //   .eq(0)
    //   .contains(notificationSettingRecord.NotificationName)
    //   .click()
    // cy.get('[  id="update_notification"]').eq(0).click()
    // cy.get('[id="close"]').eq(0).click()
    // cy.get('[id="save_tray"]').eq(0).click({force: true})
    // cy.visit('/template')
    // cy.get('[id="dropdownbell"]').click()
    
    // cy.task('connectDB', {
    //   query: `SELECT * FROM notifications WHERE email = '${notificationSettingRecord.Email}'
    //   AND "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW'`
    // }).then(queryResponse => {
    //   console.log(queryResponse)
    // })
    cy.logout()
    //}   
    
  })

  it('Login > SecondStaff', () => {
    cy.login(staffRecord2.Username, staffRecord2.Password)
    
    // cy.get('[id="dropdownbell"]').click()
    // cy.get('[ class="dropdown-menu"]')
    // cy.get('[id="dropdownbell"]').click()
    // cy.task('connectDB', {
    //   query: `SELECT * FROM notifications WHERE email = '${notificationSettingRecord.Email}'
    //   AND "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW'`
    // }).then(queryResponse => {
    //   console.log(queryResponse)
    // })
    cy.logout()
  })

  it('Login > Admin', () => {
    cy.login(userAdmin.username, userAdmin.password)
    // cy.get('[id="dropdownbell"]').click()
    // cy.get('[ class="dropdown-menu"]')
    // cy.task('connectDB', {
    //   query: `SELECT * FROM notifications WHERE "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW'`
    // }).then(queryResponse => {
    //   console.log(queryResponse)
    // })
    cy.logout()
  })
})
