import { Component, OnInit, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Menu } from './app.component.interfaces';
import { AppMetadata$ } from './app.default';
import { takeUntil } from 'rxjs/operators';
import { faSignOutAlt, faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  sideMenu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);
  ngDestroy$: Subject<boolean> = new Subject();
  @HostBinding('style.width') width: Number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeMenuItemWidthMobileview();
  }

  profile: any;

  title = 'ROAM';
  //Icons
  signout: any = faSignOutAlt;
  signin: any = faSignInAlt;
  hamburger: any = faBars;
  //theme
  defaultTheme: string = "my-theme";
  isMobile = /Android|iPhone/i.test(window.navigator.userAgent);

  constructor(public auth: AuthService, private router: Router) {
    AppMetadata$.pipe(takeUntil(this.ngDestroy$)).subscribe(meta => {
      this.sideMenu$.next(meta.sideMenu);
    });
    router.events.subscribe((route: any) => {
      if (route.url && this.sideMenu$.getValue()) {
        const menuName: string = route.url.toString().replace('/', '');
        this.toggleActiveMenu(menuName);
      }

    });
  }



  ngOnInit(): void {
    this.changeMenuItemWidthMobileview();
    this.auth.userProfile$.pipe(takeUntil(this.ngDestroy$)).subscribe(profile => {
      this.profile = profile;
    })
    if (this.auth.isAuthenticated()) {
      this.auth.renewTokens();
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
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
    if (this.auth.isAuthenticated()) {
      drawer.toggle();
      this.toggleActiveMenu(selectedItem.name);
    }
  }

  toggleActiveMenu(selectedMenu: string): void {
    const newMenu: Menu[] = this.sideMenu$.getValue();
    newMenu.forEach(item => {
      item.selectedClass = null;
      if (item.name.toLowerCase() === selectedMenu) {
        item.selectedClass = "primary";
      }
    });
    this.sideMenu$.next(newMenu);
  }



  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }
}
