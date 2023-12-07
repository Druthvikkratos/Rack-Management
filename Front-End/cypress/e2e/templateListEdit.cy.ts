/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */

import {environment} from 'src/environments/environment'
import {userAdmin, addproduct, selectTemplate, timeOut} from './e2e-constants.cy'
import { userData } from './register.cy'


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

describe('Template Listing', () => {
  it('Edit Template Testing', () => {
     cy.login(userAdmin.username, userAdmin.password)
    //  cy.contains('td', selectTemplate.template).siblings().find('[class="bi-pencil-fill mr-4 edit-icon"]').click()
    //  cy.log('Drag and Drop Email and text field')
    //  cy.wait(5000)
    //   //add new fields manually
    //  cy.get('[id="dndSourceAreaText"]').drag('[id="dndDropArea"]')
    //  cy.get('[id="dndSourceAreaEmail"]').drag('[id="dndDropArea"]')
    //  cy.get('[id="save"]').click()
    //  cy.visit('/template')

    const filepath = '../Front-End/cypress/fixtures/insertqueryfortemplate.sql'
    cy.readFile(filepath, 'utf8').then((str) => {
      str.toString()
      const templateName = 'Product_9_' + userAdmin.username
      const clientFk = userData.clientFk
      cy.task('connectDB', {
        query: `UPDATE "templates"
       SET "attributes" = ${str}
       WHERE "clientFk" = ${clientFk} AND "name" = '${templateName}'`
      }).then(queryResponse => {
        console.log(queryResponse)
      })
    })
  })

  it('Fields Validation Of template', () => {
    cy.authenticaion(token)  
     cy.get('[id="dropdown"]').click()
     cy.get('[id="selectTemplate"]')
       .contains(selectTemplate.template)
       .click({force: true})
     cy.get('[id="add_product"]').click()
     cy.get('[id="Product_quantity"]')
     cy.get('[id="product_input"]').eq(0).contains('Email')
     cy.get('[id="product_input"]').eq(1).contains('Text')
     cy.get('[id="save_product"]').click()
     cy.window().contains('Error')
     cy.get('[class="swal2-confirm swal2-styled"]').click()
     cy.get('[ id="cancel"]').click()
  })

  it('Fields Varification Of template', () => {
     cy.get('[id="add_product"]').click()
     cy.get('[id="Product_quantity"]').type(addproduct.quantity.toString())
     cy.get('[id="product_input"]').eq(0).contains('Email')
     cy.get('[type="email"]').type(addproduct.email)
     cy.get('[id="product_input"]').eq(1).contains('Text')
     cy.get('[type="text"]').type(addproduct.productname)
     cy.get('[id="save_product"]').click()
     cy.get('[id="productlisting"]')
       .contains(addproduct.productname)
       .should('be.visible')
    //Here Have to check column enable and disable and see disabled column is shown or not
    //it is not working in automated we have to do it manually
    //  cy.get('[id="columns"]').click({force: true})
    //  cy.get('[id="mat-menu-panel-0"]').contains('Id')
    //  cy.get('[id="mat-menu-panel-0"]').contains('Text')
    //  cy.get('[id="mat-menu-panel-0"]').contains('Email')
    //  cy.get('[id="mat-menu-panel-0"]').contains('Quantities')
    //  cy.get('[id="columns"]').click({force: true})
  })

  it('Delete Added Fields Of Template', () => {
     cy.get('[id="1"]').contains('Home').click({force: true})
     cy.contains('td', selectTemplate.template).siblings().find('[class="bi-pencil-fill mr-4 edit-icon"]').click()
     cy.get('[id="delete"]').eq(0).click()
     cy.window().contains('Do you want to remove this field?')
     cy.get('[class="swal2-confirm swal2-styled"]').click()
     cy.get('[id="dndDropArea"]').should('not.contain', 'Email')
     cy.get('[id="save"]').click()
     cy.visit('/template')
  })

  it('Deleted Fields Verification Of template', () => {
     cy.get('[id="dropdown"]').click()
     cy.get('[id="selectTemplate"]')
       .contains(selectTemplate.template)
       .click({force: true})
     cy.get('[id="add_product"]').click()
     cy.get('[id="Product_quantity"]')
     cy.get('[id="product_input"]').eq(0).should('not.contain', 'Email')
     cy.get('[ id="cancel"]').click()
     cy.logout()
  })
  
})
