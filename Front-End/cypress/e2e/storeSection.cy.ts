/* eslint-disable no-undef */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */
import {userAdmin, storeRecord, updateStoreRecord, notificationSettingRecord} from './e2e-constants.cy'
import {environment} from 'src/environments/environment'
let token = ''
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
    token = resp.body.access_token
    localStorage.setItem('tokens', resp.body.access_token)
  })
})
describe('CompanyLogin > Store > AddStore', () => {
  it('StoreListing', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.get('[id="1"]').contains('Store').click({force: true})
    cy.contains('Listing')
  })
  it('AddStore', () => {
    cy.intercept(environment.authloginUrl).as('addAuthHeader')
    cy.get('[id="Add_Store"]').click()
    cy.get('[id="storeName"]')
    cy.get('[id="address"]')
    cy.get('[id="CreateStore"]').click()
    cy.get('[id="storeForm"]').contains('StoreName is required')
    cy.get('[id="storeForm"]').contains('address is required')
    cy.get('[id="storeName"]').eq(0).focus().type(storeRecord.StoreName)
    cy.get('[id="address"]').eq(0).focus().type(storeRecord.Address)
    cy.get('[id="CreateStore"]').click({force: true})
  })
  it('EditStore', () => {
    cy.authenticaion(token)
    cy.get('[id="storelisiting"]')
      .contains('mat-row', storeRecord.StoreName)
      .should('be.visible')
      .find('[ id="editStore"]')
      .click()
    cy.get('[id="storeName"]').should(
      'contain.value',
      storeRecord.StoreName
    )
    cy.get('[id="address"]').should('contain.value', storeRecord.Address)
    cy.get('[id="storeName"]').clear()
    cy.get('[id="address"]').clear()
    cy.get('[id="storeName"]').type(updateStoreRecord.StoreName)
    cy.get('[id="address"]').eq(0).focus().type(updateStoreRecord.Address)
    cy.get('[id="updateStore"]').contains('Update Store').click({force: true})
    cy.visit('/stores')
  })

  it('Notification store', () => {
    cy.get('[id="storelisiting"]')
      .contains('mat-row', updateStoreRecord.StoreName)
      .should('be.visible')
      .find('[ id="fetch_notifications"]')
      .click()
    cy.contains('Notifications')
  })
  it('Add Notification ', () => {
    cy.get('[id="Add_Notification"]').click()
    cy.get('[id="notificationName"]').type(notificationSettingRecord.NotificationName)
    // cy.get('input[type="radio"]').eq(0).check('Email')
    cy.get('[id="too"]').type(notificationSettingRecord.Email)
    // cy.get('[id="select_remainder"]')
    //   .select('1 Day', {force: true})
    //   .invoke('val')
    // cy.get('[id="select_interval"]')
    //   .select('1 Day', {force: true})
    //   .invoke('val')
   // cy.get('input[type="checkbox"]').check()
    // cy.get('[id="table"]')
    // cy.get('select')
    // cy.get('[id="EscalationType"]').select('Escalation Level 1')
    // cy.get('[id="too"]').type(notificationSettingRecord.Email)
    // cy.get('[id="select_interval"]')
    //   .select('1 Day', {force: true})
    //   .invoke('val')
    // cy.get('select')
    // cy.get('[id="EscalationTypes"]').select('Escalation Level 2')
    // cy.get('[id="to"]').type(notificationSettingRecord.Email)
    // cy.get('[id="select_intervals"]')
    //   .select('1 Day', {force: true})
    //   .invoke('val')
    cy.get('[id="save_notification"]').click()
  })
  it('Edit Notification', () => {
    cy.get('[id="Notificationlist"]')
      .contains('mat-row', notificationSettingRecord.NotificationName)
      .should('be.visible')
      .find('[ id="edit_notification"]')
      .click()
    cy.get('[id="cancle_notification"]').click()
    cy.logout()
  })
  // it('Delete Notification', () => {
  //   cy.get('[id="delete_notification"]').eq(0).click()
  //   cy.window().contains('Are you sure?')
  //   cy.contains('button', 'Yes, remove!').click()
  // })
  // it('DeleteStore', () => {
  //   cy.get('[id="1"]').contains('Store').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="delete_store"]').eq(2).click()
  //   cy.window().contains('Are you sure?')
  //   cy.contains('button', 'Yes, remove!').click()
  //   cy.logout()
  // })
})
