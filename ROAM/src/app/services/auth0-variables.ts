
import {environment} from '../../environments/environment'
  export const AUTH_CONFIG: any = {
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    callbackURL: environment.auth.callbackURL
  };