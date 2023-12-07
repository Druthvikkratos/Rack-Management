// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://192.168.0.108:3000',
  baseUrl: 'http://localhost:3000',
  frontendBaseUrl: 'http://localhost:4200',
  notificationStatusSent: 'http://localhost:3000/resources/static/assets/uploads/notificationsent.jpg',
  notificationStatusNew: 'http://localhost:3000/resources/static/assets/uploads/notificationnew.jpg',
  isUserLoggedIn: 'SuperAdmin',
  selectedPlan: 'Personal',
  columnLength: 3,
  //translateUrl: 'http://localhost:3000/api/user/getData/superadmin'
  translateUrl: 'http://localhost:3000/api/user/getData/adarash_admin',
  authloginUrl: 'http://localhost:3000/api/user/auth/login',
  notificationBasedOnTimeInterval:
    'http://localhost:3000/api/trayItem/notificationBasedOnTimeInterval',
  rackNoOfrows: 20,
  rackNoOfColumns: 20,
  totalNoOfStores: 20
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
