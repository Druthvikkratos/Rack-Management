import {userAdmin, selectProduct, timeOut, addproduct, 
  testRackRecord, updateQuantity, createQuantity, notificationSettingRecord, updateStaffRecord} from './e2e-constants.cy'
import {faker} from '@faker-js/faker'
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
describe('CompanyLogin > Products > List', () => {
  it('ProductListing', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.get('[id="dropdown"]').click({force: true})
    cy.get('[id="products"]')
      .contains(selectProduct.product)
      .click({force: true})
    cy.get('[id="productname"]').contains(selectProduct.product)
  })

  it('ProductAdd', () => {
    cy.authenticaion(token)
    cy.get('[id="add_product"]').click({force: true})
    cy.get('[id="Product_quantity"]').type(addproduct.quantity.toString())
    cy.get('[type="text"]').type(addproduct.productname)
    cy.get('[id="save_product"]').click({force: true})
    cy.get('[id="productlisting"]')
      .contains('mat-row', addproduct.quantity)
      .should('be.visible')
  })
})
describe('Company Admin Login > Rack > CRUD', () => {
  it('RackListing', () => {
    cy.authenticaion(token)
    cy.get('[id="1"]').contains('Racks').click({force: true})
    cy.contains('Listing')
  })

  it('RackAdd', () => {
    cy.authenticaion(token)
    cy.get('[id="add_rack"]').contains('Add Rack').click({force: true})
    cy.get('[id="save_rack"]').contains('Save Rack').click({force: true})
    cy.get('[id="rack_form"]').contains('RackName is required')
    cy.get('[id="rack_form"]').contains('Number Of Rows is required')
    cy.get('[id="rack_form"]').contains('Number Of Columns is required')
    cy.get('[id="rack_form"]').contains('Store is required')
    cy.get('[id="name"]').type(testRackRecord.name)
    cy.get('[id="no_of_rows"]').type(testRackRecord.noOfRows.toString())
    cy.get('[id="no_of_columns"]').type(testRackRecord.noOfColumns.toString())
    cy.get('[id="select_stores"]').eq(0).select(testRackRecord.store)
    cy.get('[id="save_rack"]').contains('Save Rack').click({force: true})
    cy.visit('/racks')
    cy.get('[id="racklisting"]')
      .contains('mat-row', testRackRecord.name)
      .should('be.visible')
  })

  it('View Rack > Add Items > Add Product To Tray', () => {
    cy.authenticaion(token)
    cy.get('[id="racklisting"]')
      .contains('mat-row', testRackRecord.name)
      .should('be.visible')
    cy.get('[id="view_rack"]').eq(0).click()
    //cy.get('[id="grid"]').contains(rack.rack).click({force: true})
    cy.get('[ id="add_items"]').click()
    cy.get('[id="product-dropdownMenu"]').click()
    cy.get('[id="selectTemplates"]')
      .contains(selectProduct.product)
      .click({force: true})
    cy.get('[id="switch_button"]')
      .contains('switch to product view')
      .click({force: true})
    cy.get('[id="quantity"]').eq(0).type(createQuantity.quantity)
    cy.get('[id="save_tray"]').eq(0).click()
    cy.reload()
  })
  it('View Rack > Add Items > Edit Tray Product', () => {
    cy.get('[ id="product-dropdownMenu"]').click()
    cy.get('[id="selectTemplates"]').contains(selectProduct.product).click()
    cy.get('[id="updateQuantity"]').should('contain.value', 200)
    cy.get('[id="updateQuantity"]').clear()
    cy.get('[id="edit_notification"]').click()
    //To load Modal Popup
    cy.wait(timeOut.delay_1)
    cy.get('[id="lowerLimit"]').eq(0).type('2')
    cy.get('[id="higherLimit"]').eq(0).type('4')
    cy.get('[id="select_notifiction"]')
      .eq(0)
      .click()
      .eq(0)
      .contains(notificationSettingRecord.NotificationName)
      .click()
    cy.get('[id="update_notification"]').contains('Update Notification').click()
    cy.get('[id="close"]').contains('Close').click()
    cy.get('[id="updateQuantity"]').type(updateQuantity.updateQuantity)
    cy.get('[id="save_tray"]').eq(0).click()
    cy.reload()
    cy.get('[ id="product-dropdownMenu"]').click()
    cy.get('[id="selectTemplates"]').contains(selectProduct.product).click()
    cy.get('[id="updateQuantity"]').should('contain.value', 100)
    cy.logout()
  })
})
describe('Company Staff Login > Rack > CheckQuantity', () => {
  it('RackListing', () => {
    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)
    cy.get('[id="1"]').contains('Racks').click({force: true})
    cy.contains('Listing')
  })

  it('View Rack > Add Items > Edit Product', () => {
    // cy.authenticaion(token)
    // cy.get('[id="racklisting"]')
    //   .contains('mat-row', testRackRecord.name)
    //   .should('be.visible')
    // cy.get('[id="view_rack"]').eq(0).click()
    // //cy.get('[id="grid"]').contains(rack.rack).click({force: true})
    // cy.get('[ id="add_items"]').click()
    // cy.reload()
    // cy.get('[id="product-dropdownMenu"]').click()
    // cy.get('[id="selectTemplates"]')
    //   .contains(selectProduct.product)
    //   .click({force: true})
    // cy.get('[id="updateQuantity"]').should('contain.value', 100)
    // cy.get('[id="edit_notification"]').click()
    // //To load Modal Popup
    // cy.wait(timeOut.delay_1)
    // cy.get('[id="lowerLimit"]').eq(0).clear()
    // cy.get('[id="higherLimit"]').eq(0).clear()
    // cy.get('[id="lowerLimit"]').eq(0).type('3')
    // cy.get('[id="higherLimit"]').eq(0).type('5')
    // cy.get('[id="select_notifiction"]')
    //   .eq(0)
    //   .click()
    //   .eq(0)
    //   .contains(notificationSettingRecord.NotificationName)
    //   .click()
    // cy.get('[id="update_notification"]').contains('Update Notification').click()
    // cy.get('[id="close"]').contains('Close').click()
    // cy.get('[id="updateQuantity"]').clear()
    // cy.get('[id="updateQuantity"]').type('50')
    // cy.get('[id="save_tray"]').eq(0).click()
    // cy.reload()
    // cy.get('[id="product-dropdownMenu"]').click()
    // cy.get('[id="selectTemplates"]').contains(selectProduct.product).click()
    cy.logout()
  })
})

describe('Company Admin Login > Product > DeleteProduct > Rack > DeleteRack', () => {
  it('ProductDelete', () => {
    cy.login(userAdmin.username, userAdmin.password)
    // cy.get('[id="dropdown"]').click({force: true})
    // cy.get('[id="products"]')
    //   .contains(selectProduct.product)
    //   .click({force: true})
    // cy.get('[id="productname"]').contains(selectProduct.product)
    // cy.get('[id="productlisting"]')
    //   .contains('mat-row', addproduct.productname)
    //   .should('be.visible')
    //   .eq(0)
    //   .find('[id="delete"]')
    //   .eq(0)
    //   .click()
    // cy.window().contains('Are you sure?')
    // cy.contains('button', 'Yes, remove!').click()
    // cy.contains(addproduct.productname).should('not.exist')
  })

  it('RackDelete', () => {
    cy.authenticaion(token)
    // cy.get('[id="1"]').contains('Racks').click({force: true})
    // cy.contains('Listing')
    // cy.get('[id="racklisting"]')
    //   .contains('mat-row', testRackRecord.name)
    //   .should('be.visible')
    //   .eq(0)
    //   .find('[id="delete_rack"]')
    //   .eq(0)
    //   .click()
    // cy.window().contains('Are you sure?')
    // cy.contains('button', 'Yes, remove!').click()
    // cy.contains(testRackRecord.name).should('not.exist')
    cy.logout()
  })
})
