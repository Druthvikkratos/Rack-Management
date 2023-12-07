/* eslint-disable no-undef */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */
import {faker} from '@faker-js/faker'
import {userAdmin, updateStaffRecord, notificationSettingData, setQuantityUpperAndLowerLimit, setQuantityUpperAndLowerLimit1, setQuantityUpperAndLowerLimit2, timeOut} from './e2e-constants.cy'
import {environment} from 'src/environments/environment'
const email = 'druthvik@electems.com'

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
describe('Notification TimeInterval', () => {
  it('TimeInterval Setted To Zero And Updating Quantity to Below LowerLimit', () => {
    cy.login(userAdmin.username, userAdmin.password)
    cy.notificationSetting(
      notificationSettingData.NotificationName,
      notificationSettingData.Email,
      notificationSettingData.noOfReminders,
      notificationSettingData.timeINterval
    )
    cy.logout()
    //3. Login as updateStaffRecord
    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)
    let firstCount: number
    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      firstCount = queryResponse[0].count
    })
    cy.wait(timeOut.delay_2)
    cy.quantityLowerLimitHigherLimitSet(
      setQuantityUpperAndLowerLimit.quantity,
      setQuantityUpperAndLowerLimit.lowerLimit,
      setQuantityUpperAndLowerLimit.upperLimit,
      notificationSettingData.NotificationName
    )
    let secondCount: number

    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      secondCount = queryResponse[0].count
    })
    cy.get('button').then(() => {
      expect(secondCount - firstCount).to.eq(1)
    })
    let thirdCount: number
    //update query to set status to sent
    cy.task('connectDB', `UPDATE notifications
      SET status = 'SENT'
      WHERE email = '${notificationSettingData.Email}'`
    ).then(queryResponse => {
      thirdCount = queryResponse[0].count
    })
    cy.get('button').then(() => {
      expect(secondCount).to.eq(thirdCount)
    })
    cy.authenticaionTimeInterval(token)
    cy.task('connectDB',`SELECT * FROM notifications WHERE email = '${email}'
          AND "notificationType" = 'QUANTITY-ALERT' AND status = 'SENT' AND noofreminders = 0`
    ).then(queryResponse => {
      queryResponse[0]
    })
    cy.logout()
  })
  it('TimeInterval Setted To Zero And Updating Quantity to Greater Than HeigherLimit', () => {
    //3. Login as updateStaffRecord
    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)
    
    let firstCount: number
    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      firstCount = queryResponse[0].count
    })
    cy.wait(timeOut.delay_2)
    cy.quantityLowerLimitHigherLimitSet(
      setQuantityUpperAndLowerLimit.quantity,
      setQuantityUpperAndLowerLimit.lowerLimit,
      setQuantityUpperAndLowerLimit.upperLimit,
      notificationSettingData.NotificationName
    )

    let secondCount: number
    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      secondCount = queryResponse[0].count
    })
    cy.get('button').then(() => {
      expect(secondCount - firstCount).to.eq(1)
    })
    
    let thirdCount: number
    //update query to set status to sent
    cy.task('connectDB', `UPDATE notifications
      SET status = 'SENT'
      WHERE email = '${notificationSettingData.Email}'`
    ).then(queryResponse => {
      thirdCount = queryResponse[0].count
    })
    cy.get('button').then(() => {
      expect(secondCount).to.eq(thirdCount)
    })
    cy.authenticaionTimeInterval(token)
    
    cy.task('connectDB', `SELECT * FROM notifications WHERE email = '${email}'
          AND "notificationType" = 'QUANTITY-ALERT' AND status = 'SENT' AND noofreminders = 0`
    ).then(queryResponse => {
      queryResponse[0]
    })
    cy.logout()
  })
  it('TimeInterval Setted To Zero And Updating Quantity to below HeigherLimit and above LowerLimit', () => {
    
    cy.quantityLowerLimitHigherLimitSet(
      setQuantityUpperAndLowerLimit1.quantity,
      setQuantityUpperAndLowerLimit1.lowerLimit,
      setQuantityUpperAndLowerLimit1.upperLimit,
      notificationSettingData.NotificationName
    )
    // notification should not create
  })
  it('One Remindar 1 Day Interval', () => {
    //1. Login as Admin
    cy.login(userAdmin.username, userAdmin.password)
    //2. Create Notification Setting with 1 day and 1 reminder
    cy.notificationSetting(
      notificationSettingData.NotificationName,
      notificationSettingData.Email,
      notificationSettingData.noOfReminders,
      notificationSettingData.timeINterval
    )
    cy.logout()
    //3. Login as updateStaffRecord
    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)
    //4. Associate the Product with this new  notification setting

    //5. intialCount = Fetch count from Notification Table for that email.
    let initialCount: number
    cy.task('connectDB',  `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      initialCount = queryResponse[0].count
    })
    
    //6. Update the Quantity less than lower limit
    //Step 4 will applies here
    cy.quantityLowerLimitHigherLimitSet(
      setQuantityUpperAndLowerLimit2.quantity,
      setQuantityUpperAndLowerLimit2.lowerLimit,
      setQuantityUpperAndLowerLimit2.upperLimit,
      notificationSettingData.NotificationName
    )
    // 7. noticeCount = Fetch count from Notification Table for that email.
    let noticeCount: number
    cy.task('connectDB',  `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      noticeCount = queryResponse[0].count
    })
    
    // 8. (noticeCount - intialCount) === 1 - PASS
    // comparing the 2 variables
    cy.get('button').then(() => {
      expect(noticeCount - initialCount).to.eq(1)
    })
    // 8a. Select NoOfReminders, Pk FROM notifications WHERE email = '${email}'
    //   AND "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW' and CreatedDate = Today's date.
    let pkOfNotification: number
    cy.task('connectDB', `SELECT noofreminders,id FROM notifications WHERE email= '${notificationSettingData.NotificationName}''
      AND "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW' and "createdAt" = 'cast(now() as date)'`
    ).then(queryResponse => {
      pkOfNotification = queryResponse[0].id
    })
    
    // 9. Update notification table Status = 'SENT' where PK from 8a.
    cy.task('connectDB', `UPDATE notifications
      SET status = 'SENT'
      WHERE id = '${pkOfNotification}'`
    ).then(queryResponse => {
      queryResponse[0]
    })
    
    // 10. Trigger reminderNotificationCalculator - URL
    cy.authenticaionTimeInterval(token)
    
    // 11. reminderCount = Fetch NoOfReminders from Notification Table record where PK is from 8a.
    let reminderCount: number
    cy.task('connectDB',`SELECT noofreminders FROM notifications WHERE id=${pkOfNotification}`
    ).then(queryResponse => {
      reminderCount = queryResponse[0].noofreminders
    })
    
    // 12. reminderCount === 0 - PASS
    cy.get('button').then(() => {
      expect(reminderCount).to.eq(0)
    })
    // 13. Update notification table Status = 'SENT'  and UpdatedTimestamp = CurrentTimestamp - 1 day where PK from 8a.
    cy.task('connectDB',`UPDATE notifications
      SET status = 'SENT',"updatedAt" = cast(now() as date) - 1 WHERE id = '${pkOfNotification}'`
    ).then(queryResponse => {
      queryResponse[0]
    })
    
    // 14. Trigger reminderNotificationCalculator - URL
    cy.authenticaionTimeInterval(token)
    // 15. reminderCount = Fetch NoOfReminders from Notification Table record where PK is from 8a.
    cy.task('connectDB',  `SELECT noofreminders FROM notifications Where id='${pkOfNotification}'`
    ).then(queryResponse => {
      reminderCount = queryResponse[0].noofreminders
    })
    
    // 16. reminderCount === 1 - PASS
    cy.get('button').then(() => {
      expect(reminderCount).to.eq(1)
    })
  })

  it('Two Remindar 2 Day Interval', () => {
    cy.login(userAdmin.username, userAdmin.password)

    cy.notificationSetting(
      notificationSettingData.NotificationName,
      notificationSettingData.Email,
      notificationSettingData.noOfReminders2,
      notificationSettingData.timeINterval2
    )
    cy.logout()

    cy.login(updateStaffRecord.Username, updateStaffRecord.Password)

    let initialCount: number
    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      initialCount = queryResponse[0].count
    })
    

    cy.quantityLowerLimitHigherLimitSet(
      setQuantityUpperAndLowerLimit.quantity,
      setQuantityUpperAndLowerLimit.lowerLimit,
      setQuantityUpperAndLowerLimit.upperLimit,
      notificationSettingData.NotificationName
    )

    let noticeCount: number
    cy.task('connectDB', `SELECT COUNT(*) FROM notifications Where email='${notificationSettingData.NotificationName}'`
    ).then(queryResponse => {
      noticeCount = queryResponse[0].count
    })
    

    cy.get('button').then(() => {
      expect(noticeCount - initialCount).to.eq(1)
    })

    let pkOfNotification: number
    cy.task('connectDB',`SELECT noofreminders,id FROM notifications WHERE email= '${notificationSettingData.NotificationName}''
      AND "notificationType" = 'QUANTITY-ALERT' AND status = 'NEW' and "createdAt" = 'cast(now() as date)'`
    ).then(queryResponse => {
      pkOfNotification = queryResponse[0].id
    })
    
    //  Update notification table Status = 'SENT' where PK from 8a.(initial Day 18th)
    cy.task('connectDB',`UPDATE notifications
      SET status = 'SENT'
      WHERE id = '${pkOfNotification}'`
    ).then(queryResponse => {
      queryResponse[0]
    })
    
    //  Trigger reminderNotificationCalculator - URL
    cy.authenticaionTimeInterval(token)
    let reminderCount: number
    cy.task('connectDB', `SELECT noofreminders FROM notifications WHERE id=${pkOfNotification}`
    ).then(queryResponse => {
      reminderCount = queryResponse[0].noofreminders
    })
    

    cy.get('button').then(() => {
      expect(reminderCount).to.eq(0)
    })

    cy.task('connectDB', `UPDATE notifications
      SET status = 'NEW',"updatedAt" = cast(now() as date) - 1 WHERE id = '${pkOfNotification}'`
    ).then(queryResponse => {
      queryResponse[0]
    })
    
    //  Check noOfReminders contains 1 (1st interval Date 20th)
    cy.clock(Date.UTC(2023, 2, 20), ['Date'])
    cy.task('connectDB',`SELECT noofreminders FROM notifications WHERE id=${pkOfNotification}`
    ).then(queryResponse => {
      reminderCount = queryResponse[0].noofreminders
    })
    
    cy.get('button').then(() => {
      expect(reminderCount).to.eq(1)
    })

    // Check noOfReminders contains 2  (2st interval Date 22nd)
    cy.clock(Date.UTC(2023, 2, 22), ['Date'])
    cy.authenticaionTimeInterval(token)
    
    let reminderCount2: number
    cy.task('connectDB',`SELECT noofreminders FROM notifications WHERE id=${pkOfNotification}`
    ).then(queryResponse => {
      reminderCount2 = queryResponse[0].noofreminders
    })
    
    cy.task('connectDB',`UPDATE notifications
      SET status = 'NEW',"updatedAt" = cast(now() as date) - 1 WHERE id = '${pkOfNotification}'`
    ).then(queryResponse => {
      queryResponse[0]
    })
    
    cy.task('connectDB',`SELECT noofreminders FROM notifications WHERE id=${pkOfNotification}`
    ).then(queryResponse => {
      reminderCount = queryResponse[0].noofreminders
    })
    
    cy.get('button').then(() => {
      expect(reminderCount2).to.eq(2)
    })
    cy.logout()
  })
})
