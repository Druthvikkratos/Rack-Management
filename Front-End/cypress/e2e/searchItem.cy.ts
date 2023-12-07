import {userAdmin, template, templateRecord, templateRecord2, templateRecord3, templateRecord4,
  testStoreRecord, testStoreRecord2, testRackRecord, testRackRecord2, tray, notificationSettingRecord,
  selectProduct} from './e2e-constants.cy'
import { environment } from 'src/environments/environment'

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
describe('Rack Listing > Search item', () => {
  it('RackListing', () => {
    //1. login as admin
    cy.login(userAdmin.username, userAdmin.password)
    // edit template -> add new fields
    
    // cy.get('[id="selectTemplate"]')
    //   .contains(template.templateName)
    //   .click({force: true})
    // cy.get('[id="add_product"]').click()

    // //2. add 3 to 5 new products to store
    // //product one
    // cy.addNewProducts(
    //   templateRecord.quantity,
    //   templateRecord.newEmailField,
    //   templateRecord.newTextField
    // )
    // cy.get('[id="productlisting"]')
    //   .contains(templateRecord.newTextField)
    //   .should('be.visible')
    
    // cy.get('[id="add_product"]').click()

    // //product two
    // cy.addNewProducts(
    //   templateRecord2.quantity,
    //   templateRecord2.newEmailField,
    //   templateRecord2.newTextField
    // )
    // cy.get('[id="productlisting"]')
    //   .contains(templateRecord2.newTextField)
    //   .should('be.visible')
    
    // cy.get('[id="add_product"]').click()

    // //product three
    // cy.addNewProducts(
    //   templateRecord3.quantity,
    //   templateRecord3.newEmailField,
    //   templateRecord3.newTextField
    // )
    // cy.get('[id="productlisting"]')
    //   .contains(templateRecord3.newTextField)
    //   .should('be.visible')
    
    // cy.get('[id="add_product"]').click()

    // //product four
    // cy.addNewProducts(
    //   templateRecord4.quantity,
    //   templateRecord4.newEmailField,
    //   templateRecord4.newTextField
    // )
    // cy.get('[id="productlisting"]')
    //   .contains(templateRecord4.newTextField)
    //   .should('be.visible')
    

    // //3. create a new store
    // //store 1
    // cy.get('[id="1"]').eq(5).click({force: true})
    // cy.contains('Listing')
    // cy.get('[id="Add_Store"]').click()
    // cy.get('[id="storeName"]')
    // cy.get('[id="address"]')
    // cy.get('[id="CreateStore"]').click()
    // cy.get('[id="storeForm"]').contains('StoreName is required')
    // cy.get('[id="storeForm"]').contains('address is required')
    // cy.get('[id="storeName"]').eq(0).focus().type(testStoreRecord.StoreName)
    // cy.get('[id="address"]').eq(0).focus().type(testStoreRecord.Address)
    // cy.get('[id="CreateStore"]').click()
    // cy.get('[id="storelisiting"]')
    //   .contains('mat-row', testStoreRecord.StoreName)
    //   .should('be.visible')
    

    // //store 2
    // cy.get('[id="Add_Store"]').click()
    // cy.get('[id="storeName"]')
    // cy.get('[id="address"]')
    // cy.get('[id="CreateStore"]').click()
    // cy.get('[id="storeForm"]').contains('StoreName is required')
    // cy.get('[id="storeForm"]').contains('address is required')
    // cy.get('[id="storeName"]').eq(0).focus().type(testStoreRecord2.StoreName)
    // cy.get('[id="address"]').eq(0).focus().type(testStoreRecord2.Address)
    // cy.get('[id="CreateStore"]').click()
    // cy.get('[id="storelisiting"]')
    //   .contains('mat-row', testStoreRecord2.StoreName)
    //   .should('be.visible')
    

    // //4. create new rack for newly created store
    // // Rack 1
    // cy.createRack(
    //   testRackRecord.name,
    //   testRackRecord.noOfRows,
    //   testRackRecord.noOfColumns,
    //   testStoreRecord.StoreName
    // )
    // cy.get('[id="racklisting"]')
    //   .contains('mat-row', testRackRecord.name)
    //   .should('be.visible')
    

    // //Rack 2
    // cy.createRack(
    //   testRackRecord2.name,
    //   testRackRecord2.noOfRows,
    //   testRackRecord2.noOfColumns,
    //   testStoreRecord2.StoreName
    // )
    // cy.get('[id="racklisting"]')
    //   .contains('mat-row', testRackRecord2.name)
    //   .should('be.visible')
  })
  //5. click on view of newly created rack
  it('Single item -> One Store -> One Rack -> One Tray', () => {
    
    // cy.get('[id="racklisting"]')
    //   .contains('mat-row', testRackRecord.name)
    //   .should('be.visible')
    //   .find('[id="view_rack"]')
    //   .click()

    // //6. select a tray
    // cy.get('[id="grid"]').contains(tray.tray).click({force: true})

    // //6a. click AddItem button
    // cy.get('[ id="add_items"]').click()
    

    // //7. select template in the dropdown
    // cy.get('[id="product-dropdownMenu"]').click()
    // cy.get('[id="selectTemplates"]')
    //   .contains(selectProduct.product)
    //   .click({force: true})

    // //8. add newly created products from store to tray
    // cy.get('[id="switch_button"]')
    //   .contains('switch to product view')
    //   .click({force: true})
    // cy.get('[id="store_view"]')
    //   .contains('mat-row', templateRecord.newTextField)
    //   .find('[id="quantity"]')
    //   .type('200')
    // cy.get('[id="store_view"]')
    //   .contains('mat-row', templateRecord.newTextField)
    //   .find('[id="edit_notification"]')
    //   .click()
    // cy.wait(2000)
    // cy.get('[id="lowerLimit"]').eq(0).type('5')
    // cy.get('[id="higherLimit"]').eq(0).type('250')
    // cy.get('[id="select_notifiction"]')
    //   .eq(0)
    //   .click()
    //   .eq(0)
    //   .contains(notificationSettingRecord.NotificationName)
    //   .click()
    // cy.get('[id="update_notification"]').contains('Save Notification').click()
    // cy.get('[id="close"]').contains('Close').click()
    // cy.get('[id="store_view"]')
    //   .contains('mat-row', templateRecord.newTextField)
    //   .find('[id="save_tray"]')
    //   .click()
    // //9. back to rack listing
    // cy.get('[id="1"]').contains('Racks').click({force: true})
    // //10. enter a item name to be searched
    // cy.get('[id="search"]').type(templateRecord.newTextField)
    // //11. check the storeName, trayName, rackName is showing for that corresponding item name
    // cy.get('[id="searchbutton"]').click()
    // cy.get('[id="storeRackTrayName"]')
    //   .contains('mat-row', testStoreRecord.StoreName)
    //   .contains('mat-row', testRackRecord.name)
    //   .contains('mat-row', tray.tray)
    //   .should('be.visible')
  })
  // it('Single Item -> Only Store -> Not Tray', () => {
  //   //11a. enter a item name that present in only store not in tray
  //   //and check in table its showing only storeName, trayName(empty)
  //   cy.get('[id="search"]').clear()
    
  //   cy.get('[id="search"]').type(templateRecord3.newTextField)
  //   cy.get('[id="searchbutton"]').click()
  //   cy.get('[id="storeRackTrayName"]')
  //     .contains('mat-row', testStoreRecord.StoreName)
  //     .should('be.visible')
  // })

  // //11b. enter a item name that present in multiple store and multiple trays check it showing
  // //storeNames and trayNames of which it is present
  // //view rack2
  // it('Single item -> Multiple Stores -> Multiple Trays -> Multiple Trays', () => {
  //   cy.reload()
    
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', testRackRecord2.name)
  //     .should('be.visible')
  //     .find('[id="view_rack"]')
  //     .click()
  //   // select tray
  //   cy.get('[id="grid"]').contains(tray.tray2).click({force: true})
  //   cy.get('[ id="add_items"]').click()
    
  //   // select template from dropdown
  //   cy.get('[id="product-dropdownMenu"]').click()
  //   cy.get('[id="selectTemplates"]')
  //     .contains(selectProduct.product)
  //     .click({force: true})

  //   // switch to store view and add same item to another tray of another rack and another store
  //   // to check multiple store,tray , store names
  //   cy.get('[id="switch_button"]')
  //     .contains('switch to product view')
  //     .click({force: true}) 
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="quantity"]')
  //     .type('200')
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="edit_notification"]')
  //     .click()
  //   cy.get('[id="lowerLimit"]').eq(0).type('5')
  //   cy.get('[id="higherLimit"]').eq(0).type('250')
  //   cy.get('[id="select_notifiction"]')
  //     .eq(0)
  //     .click()
  //     .eq(0)
  //     .contains(selectNotification.notification)
  //     .click()
  //   cy.get('[id="update_notification"]').contains('Save Notification').click()
  //   cy.get('[id="close"]').contains('Close').click()
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="save_tray"]')
  //     .click()
  //   // check names table
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.get('[id="search"]').type(templateRecord.newTextField)
  //   cy.get('[id="searchbutton"]').click()
  //   cy.get('[id="storeRackTrayName"]')
  //     .contains('mat-row', testStoreRecord.StoreName)
  //     .contains('mat-row', testRackRecord.name)
  //     .contains('mat-row', tray.tray)
  //     .contains('mat-row', testStoreRecord2.StoreName)
  //     .contains('mat-row', testRackRecord2.name)
  //     .contains('mat-row', tray.tray2)
  //     .should('be.visible')
  // })
  // //11c.one store multiple trays check
  // it('Single product -> Single store -> Multiple Trays', () => {
  //   cy.reload()
  //   cy.get('[id="racklisting"]')
  //     .contains('mat-row', testRackRecord.name)
  //     .should('be.visible')
  //     .find('[id="view_rack"]')
  //     .click()
  //   cy.get('[id="grid"]').contains(tray.tray2).click({force: true})
  //   cy.get('[ id="add_items"]').click()
  //   cy.get('[id="product-dropdownMenu"]').click()
  //   cy.get('[id="selectTemplates"]')
  //     .contains(selectProduct.product)
  //     .click({force: true})
  //   cy.get('[id="switch_button"]')
  //     .contains('switch to product view')
  //     .click({force: true})
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="quantity"]')
  //     .type('200')
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="edit_notification"]')
  //     .click()
  //   cy.get('[id="lowerLimit"]').eq(0).type('5')
  //   cy.get('[id="higherLimit"]').eq(0).type('250')
  //   cy.get('[id="select_notifiction"]')
  //     .eq(0)
  //     .click()
  //     .eq(0)
  //     .contains(selectNotification.notification)
  //     .click()
  //   cy.get('[id="update_notification"]').contains('Save Notification').click()
  //   cy.get('[id="close"]').contains('Close').click()
  //   cy.get('[id="store_view"]')
  //     .contains('mat-row', templateRecord.newTextField)
  //     .find('[id="save_tray"]')
  //     .click()
  //   cy.get('[id="1"]').contains('Racks').click({force: true})
  //   cy.get('[id="search"]').type(templateRecord.newTextField)
  //   cy.get('[id="searchbutton"]').click()
  //   cy.get('[id="storeRackTrayName"]')
  //     .contains('mat-row', testStoreRecord.StoreName)
  //     .contains('mat-row', testRackRecord.name)
  //     .contains('mat-row', tray.tray)
  //     .contains('mat-row', tray.tray2)
  //     .should('be.visible')
  //   cy.logout()
  // })
  //11d. enter multiple words that should show multiple records of storeName, trayName, rackName in table
  //12. click on view -> move to tray list -> check corresponding tray is glowing or not
  //13. if item is not present ("records not found") should show
  //14. logout()
})
