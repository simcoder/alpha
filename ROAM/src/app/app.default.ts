import { BehaviorSubject } from 'rxjs';
import { AppMetadata, Menu } from './app.component.interfaces';
const menu: Menu[] = [
    { name: "Dashboard", 
      route: "/dashboard", 
      selectedClass: "primary",
      featureFlag: true 
    },
    { 
      name: "Payments", 
      route: "/payments", 
      selectedClass: null,
      featureFlag: true  
    },
    { 
      name: "Maintenance", 
      route: "/maintenance", 
      selectedClass: null,
      featureFlag: true  
    }
  ];
const meta:AppMetadata = {
    name: "ROAM",
    sideMenu: menu,
    loggedOutMessage: "",
    landingPage: "<style>.test{background-color:lightblue;}</style><h2 class='test'>Welcome to XCompany Resident Portal Please Login</h2>"
  }
export const AppMetadata$: BehaviorSubject<AppMetadata>  = new BehaviorSubject<AppMetadata>(meta);