// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripeKey: 'pk_test_JPo2pRJKV7UmiyG78bKAHSEs00nXRheN1j',
  plaid: {
    apiVersion: "v2",
    env: "sandbox",
    institution: null,
    token: null,
    webhook: "",
    product: ["auth"],
    countryCodes: ['US', 'CA', 'GB'],
    key: "0191f18378a953ad00740f00442117"
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
