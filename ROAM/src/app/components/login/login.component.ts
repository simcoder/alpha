import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppMetadata$ } from '../../app.default';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  ngDestroy$:Subject<boolean>= new Subject();
  constructor() { }
  message
  ngOnInit() {
    AppMetadata$.pipe(takeUntil(this.ngDestroy$)).subscribe(meta=>{
      this.message = meta.loggedOutMessage;
    })
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

}
