import {userAdmin,rackRecord} from './e2e-constants.cy'
import {environment} from 'src/environments/environment'

const rack = {
    rack: 'r1c1'
}

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

describe('CompanyLogin > Rack > Searchable', () => {
  it('RackListing', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.get('[id="1"]').contains('Racks').click({force: true})
    cy.contains('Listing')
  })

  it('RackAdd', () => {
    cy.authenticaion(token)
    cy.get('[id="add_rack"]').contains('Add').click({force: true})
    cy.get('[id="save_rack"]').contains('Save').click({force: true})
    cy.get('[id="rack_form"]').contains('RackName is required')
    cy.get('[id="rack_form"]').contains('Number Of Rows is required')
    cy.get('[id="rack_form"]').contains('Number Of Columns is required')
    cy.get('[id="rack_form"]').contains('Store is required')
    cy.get('[id="name"]').type(rackRecord.name)
    cy.get('[id="no_of_rows"]').type(rackRecord.noOfRows.toString())
    cy.get('[id="no_of_columns"]').type(rackRecord.noOfColumns.toString())
    cy.get('[id="select_stores"]').eq(0).select(rackRecord.store)
    cy.get('[id="save_rack"]').contains('Save').click({force: true})
    cy.visit('/racks')
    cy.get('[id="racklisting"]')
      .contains('mat-row', rackRecord.name)
      .should('be.visible')
  })
  it('Rack Listing > View Rack', () => {
    cy.authenticaion(token)
    cy.get('[id="racklisting"]')
      .contains('mat-row', rackRecord.name)
      .should('be.visible')
    cy.get('[id="view_rack"]').eq(0).click()
  })

  it('View Rack > Searchable', () => {
    cy.get('[id="grid"]').contains(rack.rack).click({force: true})
    cy.get('[id="searchable"]').should('be.checked')
    cy.get('[id="search"]').contains('Searchable').click()
    cy.get('[id="searchable"]').should('not.be.checked')
    cy.get('[id="save_tray"]').contains('Save').click({force: true})
    cy.get('[id="back"]').click({force: true})
    cy.get('[id="1"]').contains('Racks').click({force: true})
    
  })

  it('Rack Listing > View Rack', () => {
    cy.authenticaion(token)
    cy.get('[id="racklisting"]')
      .contains('mat-row', rackRecord.name)
      .should('be.visible')
    cy.get('[id="view_rack"]').eq(0).click()
  })

  it('View Rack > Searchable', () => {
    cy.get('[id="grid"]').contains(rack.rack).click({force: true})
    cy.get('[id="searchable"]').should('not.be.checked')
    cy.get('[id="search"]').contains('Searchable').click()
    cy.get('[id="searchable"]').should('be.checked')
    cy.get('[id="save_tray"]').contains('Save').click({force: true})
    cy.get('[id="back"]').click({force: true})
    cy.get('[id="1"]').contains('Racks').click({force: true})
    cy.contains('Listing')
    cy.logout()
  })
 
})
