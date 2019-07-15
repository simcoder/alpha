import { Component, OnInit, HostBinding } from '@angular/core';
import {  Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { faSignOutAlt, faSignInAlt, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Menu } from '../../app.component.interfaces';
import { loggedInUser$, sideMenu$ } from '../../app.default';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AngularFirestore } from '@angular/fire/firestore';
import { transformSideMenu } from '../../helpers/transformers';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {


  ngDestroy$: Subject<boolean> = new Subject();
  @HostBinding('style.width') width: Number;


  profile: any;
  title = 'ROAM';
  //Icons
  signout: any = faSignOutAlt;
  signin: any = faSignInAlt;
  hamburger: any = faBars;
  bell: any = faBell;
  //theme
  defaultTheme: string = "my-theme";
  sideMenu: Menu[];

  constructor(private router: Router, private overlayContainer: OverlayContainer, private db: AngularFirestore) {}

  async ngOnInit(): Promise<void> {
    this.overlayContainer.getContainerElement().classList.add(this.defaultTheme);
    sideMenu$.pipe(takeUntil(this.ngDestroy$)).subscribe(sideMenu=>{
      this.sideMenu = sideMenu;
    })
    this.router.events.pipe(takeUntil(this.ngDestroy$)).subscribe((route: any) => {
      if (route.url) {
        this.toggleActiveMenu(route.url.toString());
      }
    });
    const user = loggedInUser$.getValue();
    if (user) {
      this.db.collection("users").doc(user.uid).get().pipe().subscribe(resp => {
        const userData = resp.data();
        if (userData.role) {
         this.updateUserRoleAndLoadSideMenu(user, userData.role)
          this.router.navigate(
            [
              { preserveFragment: true },
              {
                outlets: {
                  details: 'dashboard'
                }
              }
            ]);
        } else {
          this.router.navigate(
            [
              { preserveFragment: true },
              {
                outlets: {
                  details: 'registration'
                }
              }
            ]);
        }
      });
    }
  }

  updateUserRoleAndLoadSideMenu(loggedInUser:any, role:string){
      const updatedUser = { uid: loggedInUser.uid, name: loggedInUser.name, email: loggedInUser.email, role }
      loggedInUser$.next(updatedUser);
      this.db.collection("menus").get().pipe(first(), map(snapshot=>{
        const menu = transformSideMenu(snapshot, role);
        sideMenu$.next(menu);
      })).subscribe();
  }

  onSignOut() {
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

  onClickMenuItem(drawer: any, selectedItem: Menu): void {
    this.toggleActiveMenu(selectedItem.name);
  }

  toggleActiveMenu(selectedMenu: string): void {
    const newMenu: Menu[] = sideMenu$.getValue();
    if(newMenu){
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
