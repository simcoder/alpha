import { Component, OnInit, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faSignOutAlt, faSignInAlt, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from '../../app.component.interfaces';
import { AppMetadata$ } from '../../app.default';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

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
  bell: any = faBell;
  //theme
  defaultTheme: string = "my-theme";
  isMobile = /Android|iPhone/i.test(window.navigator.userAgent);

  constructor(private router: Router, private overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add(this.defaultTheme);
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
    this.router.navigate(
      [
        { preserveFragment: true },
        { 
          outlets: { 
            details: 'dashboard'
          }
        }
    ]);
    //this.auth.handleAuthentication();
    this.changeMenuItemWidthMobileview();
    // this.auth.userProfile$.pipe(takeUntil(this.ngDestroy$)).subscribe(profile => {
    //   this.profile = profile;
    // })
  }

  onSignOut(event){
    this.router.navigate(['']);
  }

  onThemSwitch(event): void {
    if (event.checked) {
      this.defaultTheme = "my-dark-theme";
    } else {
      this.defaultTheme = "my-theme";
    }
    this.overlayContainer.getContainerElement().classList.add(this.defaultTheme);
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
    // if (this.auth.isAuthenticated()) {
    //   drawer.toggle();
    //   this.toggleActiveMenu(selectedItem.name);
    // }
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
