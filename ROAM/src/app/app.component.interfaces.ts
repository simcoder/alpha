export interface Menu {
    name: string;
    route: string;
    icon?: string;
    selectedClass?: string;
  }
  export interface AppMetadata {
    sideMenu: Menu[];
    name:string;
    loggedOutMessage:string;
  }