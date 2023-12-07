/* eslint-disable no-undef */
import {faker} from '@faker-js/faker'

export const companyAdmin = {
  username: 'shashisuperadmin',
  pwd: 'cybis@ban'
}

export const companyAdmin2 = {
  username: 'adarash_admin',
  pwd: 'cybis@ban'
}

export const userAdmin = {
  username: faker.lorem.word() + 'Admin',
  email: faker.lorem.word() + '@gmail.com',
  password: 'cybis@ban',
  confirmPassword: 'cybis@ban',
  phone: Math.floor(Math.random() * 10000000000),
  location: faker.lorem.word(),
  // plan: 'Company/Traders'
}

export const password = {
  password: 'cybis@ban',
  confirmpassword: 'cybis@ban'
}
export const passwordMismatch = {
  password: 'company2',
  confirmpassword: 'company'
}

export const staffRecord = {
  Username: faker.lorem.word() + '-staffName',
  Email: faker.lorem.word() + '@gmail.com',
  Password: 'cybis@ban',
  ConfirmPassword: 'cybis@ban'
}

export const updateStaffRecord = {
  Username: faker.lorem.word() + '-staffName',
  Email: faker.lorem.word() + '@gmail.com',
  Password: 'company2',
  ConfirmPassword: 'company2'
}

export const staffRecord2 = {
  Username: faker.lorem.word() + '-staffName',
  Email: faker.lorem.word() + '@gmail.com',
  Password: 'cybis@ban',
  ConfirmPassword: 'cybis@ban'
}

export const staffRecord3 = {
  Username: faker.lorem.word() + '-staffName',
  Email: faker.lorem.word() + '@gmail.com',
  Password: 'cybis@ban',
  ConfirmPassword: 'cybis@ban'
}

export const storeRecord = {
  StoreName: faker.lorem.word() + '-storeName',
  Address: faker.lorem.word()
}

export const updateStoreRecord = {
  StoreName: faker.lorem.word() + '-storeName',
  Address: faker.lorem.word()
}

export const notificationSettingRecord = {
  NotificationName: faker.lorem.word(),
  Email: faker.lorem.word() + '@gmail.com'
}

export const environment = {
  baseUrl: 'http://localhost:3000',
  frontendBaseUrl: 'http://localhost:3000'
}

export const rackRecord = {
  name: faker.lorem.word() + '-rackName',
  noOfRows: 4,
  noOfColumns: 5,
  store: updateStoreRecord.StoreName
}

export const updateRackRecord = {
  name: faker.lorem.word() + '-rackName',
  noOfRows: 3,
  noOfColumns: 3,
  store: 'Walmart'
}

export const translateValues = {
  staff: 'StaffCheck',
  rack: 'RacksCheck',
  store: 'StoreCheck',
  product:'ProductCheck'
  }

export const addproduct = {
  quantity: faker.datatype.number(),
  email: faker.lorem.word() + '@gmail.com',
  productname: faker.commerce.product() + '-productName'
}
  
export const updateProduct = {
  quantity: faker.datatype.number(),
  productname: faker.commerce.product() + '-productName'
}

export const selectTemplate = {
  template: 'Product_2_' + userAdmin.username
}

export const timeOut = {
  delay_1 : 1000,
  delay_2: 2000,
  delay_3 : 3000
}


export const testRackRecord = {
  name: faker.lorem.word() + '-rackName',
  noOfRows: 4,
  noOfColumns: 4,
  store: 'provident-storeName'
}
export const testRackRecord2 = {
  name: faker.lorem.word() + '-rackName',
  noOfRows: 4,
  noOfColumns: 4,
  store: 'provident-storeName'
}
export const testUpdateRackRecord = {
  name: faker.lorem.word() + '-rackName',
  noOfRows: 5,
  noOfColumns: 5,
  store: 'Store-1'
}
export const rackSelect = {
  rackName: 'r2c3',
  rackRename: 'r4c3'
}
export const createQuantity = {
  quantity: '200'
}

export const selectProduct = {
  product: 'Product_2_' + userAdmin.username
}
export const updateQuantity = {
  updateQuantity: '20'
}
export const tray = {
  tray: 'r1c1',
  tray2: 'r2c2'
}


export const selectNotification = {
  notification: 'notification new'
}
export const testStoreRecord = {
  StoreName: faker.lorem.word() + '-storeName',
  Address: faker.lorem.word()
}
export const testStoreRecord2 = {
  StoreName: faker.lorem.word() + '-storeName',
  Address: faker.lorem.word()
}
export const template = {
  templateName: 'Product_2_' + + userAdmin.username ,
  changedTemplateName: faker.lorem.word()
}
export const templateRecord = {
  quantity: '1000',
  oldTextField: faker.lorem.word(),
  newEmailField: faker.lorem.word() + '@gmail.com',
  newTextField: faker.lorem.word()
}
export const templateRecord2 = {
  quantity: '500',
  oldTextField: faker.lorem.word(),
  newEmailField: faker.lorem.word() + '@gmail.com',
  newTextField: faker.lorem.word()
}
export const templateRecord3 = {
  quantity: '600',
  oldTextField: faker.lorem.word(),
  newEmailField: faker.lorem.word() + '@gmail.com',
  newTextField: faker.lorem.word()
}
export const templateRecord4 = {
  quantity: '400',
  oldTextField: faker.lorem.word(),
  newEmailField: faker.lorem.word() + '@gmail.com',
  newTextField: faker.lorem.word()
}
export const contactus = {
  Username: faker.lorem.word() + '-username',
  Message: faker.lorem.lines(1)
}

export const notificationSettingData = {
  NotificationName: faker.lorem.word() + '-notification',
  Email: faker.lorem.word() + '@gmail.com',
  noOfReminders: '1 Day',
  timeINterval: '1 Day',
  noOfReminders2: '2 Days',
  timeINterval2: '2 Days'
}

export const setQuantityUpperAndLowerLimit = {
  quantity: '4',
  lowerLimit: '5',
  upperLimit: '225'
}

export const setQuantityUpperAndLowerLimit1 = {
  quantity: '10',
  lowerLimit: '5',
  upperLimit: '20'
}

export const setQuantityUpperAndLowerLimit2 = {
  quantity: '4',
  lowerLimit: '3',
  upperLimit: '20'
}