export const environment = {
  production: true,
  auth:{
    clientID: "NcXmlrI17X6go0HBA0z2vHAos8KD7zhg",
    domain: "simcoder.auth0.com",
    callbackURL: "http://localhost:8080/callback",
    audience: 'YOUR-AUTH0-API-IDENTIFIER',
    redirect: 'http://localhost:8080/callback',
    scope: 'openid profile email'
  }
};
