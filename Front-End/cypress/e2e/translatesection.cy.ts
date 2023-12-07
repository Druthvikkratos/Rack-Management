/* eslint-disable no-undef */
/* eslint-disable i18n-text/no-en */
/* eslint-disable filenames/match-regex */
/* eslint-disable check-file/filename-naming-convention */
import {environment} from 'src/environments/environment'
import {userAdmin, translateValues} from './e2e-constants.cy'

const token = ''
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

describe('TranslateSectionTest', () => {
  it('User1 TranslateListing Staff', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.get('[id="1"]').contains('Translate').click({force: true})
    cy.contains('Listing')
  })

  it('User1 AddTranslate Staff', () => {
    cy.get('[id="TranslateList"]')
  //  cy.contains('Translate Listing') 
  //  cy.get('[id="edit_translate"]').eq(5).click({force: true})  
  //  cy.window().contains('Update Translate')
  //  cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type(translateValues.staff)
  //   cy.get('[id="add_translate"]').click({force: true})    
  //   cy.get('[id="1"]').contains(translateValues.staff)
  //   cy.get('[id="1"]').eq(4).click({force: true})
  //   cy.contains(' Listing')
  //   cy.get('[id="Add_Staff"]').contains(`Add `).click()
  //   cy.contains(`Create ${translateValues.staff}`)
  //   cy.get('[id="CreateStaff"]').contains(`Create ${translateValues.staff}`).click()
  //   cy.get('[id="CancelStaff"]').click()
  })

  it('User1 AddTranslate Racks', () => {
    cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.get('[id="TranslateList"]')
  //  cy.contains('Translate Listing') 
  //  cy.get('[id="edit_translate"]').eq(2).click({force: true})  
  //  cy.window().contains('Update Translate')
  //  cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type(translateValues.rack)
  //   cy.get('[id="add_translate"]').click({force: true})    
  //   cy.get('[id="1"]').contains(translateValues.rack)
  //   cy.get('[id="1"]').eq(2).click({force: true})
  //   cy.contains(' Listing')
  //   cy.get('[id="add_rack"]').contains(`Add `).click()
  //   cy.contains(`Create ${translateValues.rack}`)
  //   cy.get('[id="save_rack"]').contains(`Save ${translateValues.rack}`).click()
  //   cy.get('[id="cancel_rack"]').click()
  })

  it('User1 AddTranslate Stores', () => {
    cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.get('[id="TranslateList"]')
  //  cy.contains('Translate Listing') 
  //  cy.get('[id="edit_translate"]').eq(4).click({force: true})  
  //  cy.window().contains('Update Translate')
  //  cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type(translateValues.store)
  //   cy.get('[id="add_translate"]').click({force: true})    
  //   cy.get('[id="1"]').contains(translateValues.store)
  //   cy.get('[id="1"]').eq(5).click({force: true})
  //   cy.contains(' Listing')
  //   cy.get('[id="Add_Store"]').contains(`Add `).click()
  //   cy.contains(`Create ${translateValues.store}`)
  //   cy.get('[id="CreateStore"]').contains(`Save ${translateValues.store}`).click()
  //   cy.get('[id="CancelStore"]').click()
  })

  it('User1 AddTranslate Product', () => {
    cy.get('[id="TranslateList"]')
  //  cy.contains('Translate Listing') 
  //  cy.contains('button', 'Add Row').click()
  //  cy.get('[id="key_id"]').type('product')
  //   cy.get('[ id="value_id"]').eq(0).type(translateValues.product)
  //   cy.get('[id="add_translate"]').click({force: true})    
  //   cy.get('[id="1"]').contains(translateValues.product)
  //   cy.get('[id="1"]').eq(6).click({force: true})
  //   cy.contains(' Listing')
  //   cy.get('[id="Add_Staff"]').contains(`Add `).click()
  //   cy.contains(`Create ${translateValues.staff}`)
  //   cy.get('[id="CreateStaff"]').contains(`Create ${translateValues.staff}`).click()
  //   cy.get('[id="CancelStaff"]').click()
  })

  // it('User1 TranslateListing item', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  // })

  // it('User1 AddTranslate item', () => {
  //   cy.get('[id="TranslateList"]')
  //   cy.contains('Translate Listing')
  //   cy.contains('button', 'Add Row').click()
  //   cy.get('[id="key_id"]').type('item')
  //   cy.get('[id="value_id"]').type('items')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('items')
  // })

  // it('User1 CheckTranslate item', () => {
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.get('[ id="add_items"]').contains('item')
  //   cy.get('[ id="rack_back"]').click({force: true})
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  // })

  // it('User1 EditTranslate item', () => {
  //   cy.get('[id="edit_translate"]').eq(7).click({force: true})
  //   cy.window().contains('Update Translate')
  //   cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type('itemCheck')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('itemCheck')
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.contains('itemCheck')
  //   cy.get('[ id="rack_back"]').click({force: true})
  //   cy.logout()
  // })

  // it('User2 edit Itemcheck item', () => {
  //   cy.login(staff.username, staff.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.get('[id="add_items"]').contains('Add ')
  //   cy.get('[ id="rack_back"]').click({force: true})
  //   cy.logout()
  // })

  // it('User1 TranslateAdd tray', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="TranslateList"]')
  //   cy.contains('Translate Listing')
  //   cy.contains('button', 'Add Row').click()
  //   cy.get('[id="key_id"]').type('tray')
  //   cy.get('[id="value_id"]').type('trays')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('trays')
  // })

  // it('User1 CheckTranslate Tray', () => {
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Racks Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.contains('Racks Listing')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.contains('trays')
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.logout()
  // })

  // it('User2  Itemcheck Tray', () => {
  //   cy.login(staff.username, staff.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Racks Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.contains('Racks Listing')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[class="page-title"]').contains('Arrange trays of Racks : Rack-1')
  //   cy.logout()
  // })

  // it('User1 AddTranslate tray', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="TranslateList"]')
  //   cy.contains('Translate Listing')
  //   cy.contains('button', 'Add Row').click()
  //   cy.get('[id="key_id"]').type('tray')
  //   cy.get('[id="value_id"]').type('trays')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('trays')
  // })

  // it('User1 CheckTranslate tray', () => {
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.contains('trays')
  //   cy.logout()
  // })

  // it('User2  Itemcheck tray', () => {
  //   cy.login(staff.username, staff.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.contains('trays')
  //   cy.logout()
  // })

  // it('User1 EditTranslate tray', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="edit_translate"]').eq(8).click({force: true})
  //   cy.window().contains('Update Translate')
  //   cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type('trayCheck')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('trayCheck')
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.contains('trayCheck')
  //   cy.logout()
  // })

  // it('User2 Edit  Itemcheck tray', () => {
  //   cy.login(staff.username, staff.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.contains('trayCheck')
  //   cy.logout()
  // })

  // it('User1 AddTranslate product', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="TranslateList"]')
  //   cy.contains('Translate Listing')
  //   cy.contains('button', 'Add Row').click()
  //   cy.get('[id="key_id"]').type('product')
  //   cy.get('[id="value_id"]').type('products')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('products')
  // })

  // it('User1 CheckTranslate product', () => {
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.get('[id="add_items"]').click({force: true})
  //   cy.logout()
  // })

  // it('User1 EditTranslate product', () => {
  //   cy.login(userAdmin.username, userAdmin.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Translate').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="edit_translate"]').eq(9).click({force: true})
  //   cy.window().contains('Update Translate')
  //   cy.get('[ id="value_id"]').eq(0).clear({force: true})
  //   cy.get('[ id="value_id"]').eq(0).type('productCheck')
  //   cy.get('[id="add_translate"]').click({force: true})
  //   cy.get('[id="TranslateList"]').contains('productCheck')
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.get('[ id="add_items"]').click({force: true})
  //   cy.logout()
  // })

  // it('User2 Edit  Itemcheck product', () => {
  //   cy.login(staff.username, staff.password)
  //   cy.authenticaion(token)
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.contains('Listing')
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', 'Rack-1')
  //     .should('be.visible')
  //   cy.get('[id="view_rack"]').eq(0).click()
  //   cy.get('[id="grid"]').contains(rackSelect.rackName).click({force: true})
  //   cy.get('[ id="add_items"]').click({force: true})
  //   cy.logout()
  // })




 
})
