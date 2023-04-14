// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  catalogsUrl: 'http://localhost:8081/catalogs',
  accountsUrl: 'http://localhost:8080/accounts',
  notificationsUrl: 'http://localhost:8082/notifications',
  reservationsUrl: 'http://localhost:8086/reservations',
  baseUrl: 'https://spring-boot-new.uc.r.appspot.com',//'https://spring-boot-new.uc.r.appspot.com/',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
