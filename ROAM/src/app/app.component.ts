import { Component, OnInit, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppMetadata, Menu } from './app.component.interfaces';
import { AppMetadata$ } from './app.default';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  appMetadata$: BehaviorSubject<AppMetadata> = new BehaviorSubject<AppMetadata>(null);
  ngDestroy$: Subject<boolean> = new Subject();
  @HostBinding('style.width') width: Number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeMenuItemWidthMobileview();
  }

  profile:any;

  title = 'ROAM';
  defaultTheme: string = "my-theme";
  isMobile = /Android|iPhone/i.test(window.navigator.userAgent);

  constructor(public auth: AuthService) {
    AppMetadata$.pipe(takeUntil(this.ngDestroy$)).subscribe(meta => {
      this.appMetadata$.next(meta);
    });
  }



  ngOnInit(): void {
    this.changeMenuItemWidthMobileview();
    this.auth.userProfile$.pipe(takeUntil(this.ngDestroy$)).subscribe(profile=>{
      this.profile = profile;
    })
    if (this.auth.isAuthenticated()) {
      this.auth.renewTokens();
    }
  }

  onThemSwitch(event): void {
    if (event.checked) {
      this.defaultTheme = "my-dark-theme";
    } else {
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
    const newMenu = Object.assign(this.appMetadata$.getValue().sideMenu);
    newMenu.forEach(item => {
      item.selectedClass = null
    });
    const name = this.appMetadata$.getValue().name;
    const loggedOutMessage = this.appMetadata$.getValue().loggedOutMessage;
    this.appMetadata$.next({ name, loggedOutMessage, sideMenu: newMenu })
    selectedItem.selectedClass = "primary";
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }
}
