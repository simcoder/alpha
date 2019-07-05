// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: "NcXmlrI17X6go0HBA0z2vHAos8KD7zhg",
    domain: "simcoder.auth0.com",
    callbackURL: "http://localhost:4200",
    audience: 'YOUR-AUTH0-API-IDENTIFIER',
    redirect: 'http://localhost:4200',
    scope: 'openid profile email'
  },
  firebase: {
    apiKey: "AIzaSyCaSGKwMcKSoNnbCsF98Ery7i1Fim0lkgc",
    authDomain: "property-management-advisor.firebaseapp.com",
    databaseURL: "https://property-management-advisor.firebaseio.com",
    projectId: "property-management-advisor",
    storageBucket: "",
    messagingSenderId: "949522077085",
    appId: "1:949522077085:web:f0f7f484fc258464"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
