import { AppMenuRequest } from "./../../store/actions/app.action";
import { PMAUser } from "./../../models/user.interace";
import { Component, OnInit, HostBinding } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  faSignOutAlt,
  faSignInAlt,
  faBars,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { Menu } from "../../app.component.interfaces";
import { sideMenu$ } from "../../app.default";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store/";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit {
  ngDestroy$: Subject<boolean> = new Subject();
  @HostBinding("style.width") width: Number;

  profile: any;
  title = "ROAM";
  //Icons
  signout: any = faSignOutAlt;
  signin: any = faSignInAlt;
  hamburger: any = faBars;
  bell: any = faBell;
  //theme
  defaultTheme: string = "my-theme";
  sideMenu: Menu[];
  sideMenu$: Observable<Menu[]>;

  constructor(
    private router: Router,
    private store: Store<fromStore.AppState>,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.sideMenu$ = this.store.select(fromStore.appMenu);
    this.store.select(fromStore.getUser).pipe(takeUntil(this.ngDestroy$)).subscribe(user => {
       this.routeUser(user);
    });
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.defaultTheme);
    sideMenu$.pipe(takeUntil(this.ngDestroy$)).subscribe(sideMenu => {
      this.sideMenu = sideMenu;
    });
    this.router.events
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((route: any) => {
        if (route.url) {
          this.toggleActiveMenu(route.url.toString());
        }
      });
  }

  routeUser(user: PMAUser): any {
    if (user) {
      if (user.role) {
        this.store.dispatch(new AppMenuRequest(user.role));
        this.router.navigate([
          { preserveFragment: true },
          {
            outlets: {
              details: "dashboard"
            }
          }
        ]);
      } else {
        this.router.navigate([
          { preserveFragment: true },
          {
            outlets: {
              details: "registration"
            }
          }
        ]);
      }
    }
  }

  onSignOut() {
    this.router.navigate(["login"]);
  }

  onThemSwitch(event): void {
    if (event.checked) {
      this.defaultTheme = "my-dark-theme";
    } else {
      this.defaultTheme = "my-theme";
    }
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.defaultTheme);
  }

  onClickMenuItem(drawer: any, selectedItem: Menu): void {
    this.toggleActiveMenu(selectedItem.name);
  }

  toggleActiveMenu(selectedMenu: string): void {
    const newMenu: Menu[] = sideMenu$.getValue();
    if (newMenu) {
      newMenu.forEach(item => {
        item.selectedClass = null;
        if (selectedMenu.includes(item.name.toLowerCase())) {
          item.selectedClass = "primary";
        }
      });
      sideMenu$.next(newMenu);
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }
}
