/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */
import {
  companyAdmin
} from './e2e-constants.cy'
import { environment } from 'src/environments/environment'
const baseUrl = environment.frontendBaseUrl

describe('Home', () => {
  it('Rack Managemant > Login > AdminLogin', () => {
    cy.login(companyAdmin.username, companyAdmin.pwd)
    cy.visit(`${baseUrl}/template`)
    cy.logout()
  })
})
