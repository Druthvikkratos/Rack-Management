/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */
import {timeOut, userAdmin, addproduct, updateProduct, selectTemplate} from './e2e-constants.cy'
import {environment} from 'src/environments/environment'

const requiredData = {
  schemaName : 'adarash_admin',
  formName : 'product_2_adarash_admin'
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
describe('CompanyLogin > Products > List', () => {
  const schemaName = requiredData.schemaName
  const formName = requiredData.formName
  let totalLength = 0;  
  it('ProductListing', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.get('[id="dropdown"]').click({force: true})
    cy.get('[id="products"]').contains(selectTemplate.template).click({force: true})
    cy.get('[id="productname"]').contains(selectTemplate.template)
  })

  //Product Already Added on translate section
  // it('ProductAdd', () => {
  //   cy.authenticaion(token)
  //   cy.get('[id="add_product"]').click({force: true})
  //   cy.get('[id="Product_quantity"]').type(addproduct.quantity.toString())
  //   cy.get('[type="text"]').type(addproduct.productname)
  //   cy.get('[id="save_product"]').click({force: true})
  //   cy.wait(timeOut.delay_2)
  //   cy.get('[id="productlisting"]')
  //     .contains('mat-row', addproduct.quantity)
  //     .should('be.visible')
  //     cy.wait(timeOut.delay_2)
  // })

  it('ProductEdit', () => {
    cy.authenticaion(token)
      cy.get('[id="productlisting"]')
      .contains('mat-row', addproduct.quantity)
      .should('be.visible')
      .eq(0)
      .find('[class="bi-pencil-fill mr-4 edit-icon"]') // used class here because the icon is in ts file.
      .eq(0)
      .click()
    cy.get('[id="edit_Product_quantity"]').should(
      'contain.value',
      addproduct.quantity
    )
    cy.get('[type="text"]').should(
      'contain.value',
      addproduct.productname
    )
    cy.get('[id="edit_Product_quantity"]').clear({force: true})
    cy.get('[type="text"]').clear({force: true})
    cy.get('[id="edit_Product_quantity"]').type(updateProduct.quantity.toString())
    cy.get('[type="text"]').type(updateProduct.productname)
    cy.get('[id="save"]').contains('Save').click({force: true})
    cy.get('[id="productlisting"]')
      .contains('mat-row', updateProduct.productname)
      .should('be.visible')
    cy.wait(timeOut.delay_2)
    cy.logout()
  })


  //Delete may be use in other spec file else i will enable it
  it('ProductDelete', () => {    
    cy.get('[id="productlisting"]')
      .contains('mat-row', updateProduct.productname)
      .should('be.visible')
      .eq(0)
      .find('[id="delete"]')
      .eq(0)
      .click()
    cy.window().contains('Are you sure?')
    cy.contains('button', 'Yes, remove!').click()
    cy.wait(timeOut.delay_2)
    cy.contains(updateProduct.productname).should('not.exist')
    cy.logout()
  })

  it('ProductListing Pagination Page 1', () => {
    cy.login(userAdmin.username, userAdmin.password)
     

    cy.get('[id="dropdown"]').click({force: true})
    cy.get('[id="products"]').contains('Product 2 adarash admin').click({force: true})
    // cy.get('[id="productname"]').contains('Product 2 adarash admin')

    cy.task('connectDB',`SELECT * FROM ${schemaName}.${formName}_template order by id`
    ).then(queryResponse => {
     totalLength = queryResponse.length
     console.log(totalLength)
    })
    const pageEnds = `${totalLength }` + '-' + `${totalLength }` + 'of' + `${totalLength }`
    cy.get('div').should('have.class', 'mat-mdc-paginator-range-actions').contains(totalLength)
    let totalRecordsFromQuery1 = 0
    let size = 5
    let page  = 0
    let offset = page * size

    cy.task('connectDB',`SELECT * FROM ${schemaName}.${formName}_template order by id  LIMIT ${size} OFFSET ${offset}`
    ).then(queryResponse => {
      totalRecordsFromQuery1 = queryResponse.length
    })

    let tableRecordsLengthPage1 = 0
    cy.get('[id="productlisting"]').find('[role="row"]').then((row)=>{
      tableRecordsLengthPage1 = row.length-1
    })

    cy.get('button').then(() => {
      expect(totalRecordsFromQuery1).to.eq(tableRecordsLengthPage1)
    })
    // console.log(pageEnds)
    // cy.get('div').should('have.class', 'mat-mdc-paginator-range-actions').should('have.class', 'mat-mdc-paginator-range-label').contains(pageEnds)
  })

  it('Page 2', () => {
    let totalRecordsFromQuery2 = 0
    let size = 5
    let page  = 1
    let offset = page * size 
    cy.task('connectDB',`SELECT * FROM ${schemaName}.${formName}_template order by id  LIMIT ${size} OFFSET ${offset}`
    ).then(queryResponse => {
      totalRecordsFromQuery2 = queryResponse.length
    })
  
    cy.get('[aria-label="Next page"]').click({force:true})
  
    let tableRecordsLengthPage2 = 0
    cy.get('[id="productlisting"]').find('[role="row"]').then((row)=>{
      tableRecordsLengthPage2 = row.length-1
    })
    cy.get('button').then(() => {
      expect(totalRecordsFromQuery2).to.eq(tableRecordsLengthPage2)
    })
  })

  it('Page 3', () => {
    let totalRecordsFromQuery3 = 0
    let size = 5
    let page  = 2
    let offset = page * size    
    cy.task('connectDB',`SELECT * FROM ${schemaName}.${formName}_template order by id  LIMIT ${size} OFFSET ${offset}`
    ).then(queryResponse => {
      totalRecordsFromQuery3 = queryResponse.length
    })

    cy.get('[aria-label="Next page"]').click({force:true})

    let tableRecordsLengthPage3 = 0
    cy.get('[id="productlisting"]').find('[role="row"]').then((row)=>{
      tableRecordsLengthPage3 = row.length-1
    })
    cy.get('button').then(() => {
      expect(totalRecordsFromQuery3).to.eq(tableRecordsLengthPage3)
    })
  })
})
