export interface Menu {
    name: string;
    route: string;
    icon?: string;
    selectedClass?: string;
    featureFlag: boolean;
  }
  export interface AppMetadata {
    sideMenu: Menu[];
    name:string;
    loggedOutMessage:string;
    landingPage:string;
  }