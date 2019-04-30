import { Component, OnInit, HostBinding, ElementRef, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
export interface Menu {
  name: string;
  route: string;
  icon?: string;
  selectedClass?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('style.width') width: Number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeMenuItemWidthMobileview();
  }
  //TODO persist this in DB
  menu: Menu[] = [
    { name: "Dashboard", route: "/dashboard", selectedClass: "primary" },
    { name: "Payments", route: "/payments", selectedClass: null}
  ]
  title = 'ROAM';
  defaultTheme:string = "my-theme";
  isMobile = /Android|iPhone/i.test(window.navigator.userAgent);

  constructor(public auth: AuthService) {
     auth.handleAuthentication();
   }

  ngOnInit(): void {
    this.changeMenuItemWidthMobileview();
    if (this.auth.isAuthenticated()) {
      this.auth.renewTokens();
    }
  }

  onThemSwitch(event):void {
    if(event.checked){
      this.defaultTheme = "my-dark-theme";
    }else {
      this.defaultTheme = "my-theme";
    }
  }

  changeMenuItemWidthMobileview(): void {
    if (this.isMobile) {
      //portrait only
      if (window.innerHeight > window.innerWidth) {
        const mobileScreen = window.innerWidth;
        this.width = mobileScreen;
      }
    }
  }

  onClickMenuItem(drawer: any, selectedItem: Menu): void {
    drawer.toggle();

    this.menu.forEach(item => {
      item.selectedClass = null
    });
    selectedItem.selectedClass = "primary";
  }
}
