import { takeUntil, first } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from "../../store/";
import { PMAUser } from '../../models/user.interace';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnDestroy {
  
  @Input()
  canLogout = true;


  @Output()
  onSignOut: EventEmitter<void> = new EventEmitter();

  user: any;
  user$: Observable<any | null>;
  displayNameInitials: string;

  constructor(private store: Store<fromStore.AppState>) {}
  ngDestroy$:BehaviorSubject<boolean>=new BehaviorSubject(false);
  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUser);
    this.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: PMAUser) => {
      this.displayNameInitials = user ? this.getDisplayNameInitials(user.displayName) : null;
    });
    this.store.select(fromStore.userSignoutState).subscribe(isUserSignedOut=>{
      if(isUserSignedOut){
        this.onSignOut.emit();
      }
    })
  }

  getDisplayNameInitials(displayName: string): string {
    if (!displayName) {
      return null;
    }
    const initialsRegExp: RegExpMatchArray = displayName.match(/\b\w/g) || [];
    const initials = ((initialsRegExp.shift() || '') + (initialsRegExp.pop() || '')).toUpperCase();
    return initials;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

  openProfile() {
    //this.dialog.open(UserComponent);
  }

  signOut() {
   this.store.dispatch(new fromStore.UserLogoutRequest());
  }

}
