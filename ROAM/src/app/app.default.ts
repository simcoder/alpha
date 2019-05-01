import { BehaviorSubject } from 'rxjs';
import { AppMetadata, Menu } from './app.component.interfaces';
const menu: Menu[] = [
    { name: "Dashboard", route: "/dashboard", selectedClass: "primary" },
    { name: "Payments", route: "/payments", selectedClass: null}
  ];
const meta:AppMetadata = {
    name: "ROAM",
    sideMenu: menu,
    loggedOutMessage: "Welcome to XCompany Resident Portal Please Login"
  }
export const AppMetadata$: BehaviorSubject<AppMetadata>  = new BehaviorSubject<AppMetadata>(meta);