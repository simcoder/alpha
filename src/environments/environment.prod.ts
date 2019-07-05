export const environment = {
  production: true,
  auth:{
    clientID: "NcXmlrI17X6go0HBA0z2vHAos8KD7zhg",
    domain: "simcoder.auth0.com",
    callbackURL: "http://localhost:8080",
    audience: 'YOUR-AUTH0-API-IDENTIFIER',
    redirect: 'http://localhost:8080',
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
