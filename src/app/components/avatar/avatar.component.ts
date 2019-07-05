import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  canLogout = true;


  @Output()
  onSignOut: EventEmitter<void> = new EventEmitter();

  user: any;
  user$: Observable<any | null>;
  displayNameInitials: string;

  constructor(public afa: AngularFireAuth,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.user$ = this.afa.user;
    this.user$.subscribe((user: User) => {
      this.user = user;
      this.displayNameInitials = user ? this.getDisplayNameInitials(user.displayName) : null;
    });
  }

  getDisplayNameInitials(displayName: string): string {
    if (!displayName) {
      return null;
    }
    const initialsRegExp: RegExpMatchArray = displayName.match(/\b\w/g) || [];
    const initials = ((initialsRegExp.shift() || '') + (initialsRegExp.pop() || '')).toUpperCase();
    return initials;
  }

  openProfile() {
    //this.dialog.open(UserComponent);
  }

  async signOut() {
    try {
      await this.afa.auth.signOut();
      // Sign-out successful.
      this.onSignOut.emit();
    } catch (e) {
      // An error happened.
      console.error('An error happened while signing out!', e);
    }
  }

}
