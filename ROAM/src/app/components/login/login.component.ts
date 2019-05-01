import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
  
  ngOnInit() {}

  @ViewChild('container') container:ElementRef;

ngAfterViewInit() {
  AppMetadata$.pipe(takeUntil(this.ngDestroy$)).subscribe(meta=>{
    this.container.nativeElement.insertAdjacentHTML('beforeend', meta.landingPage);

  })
 
}

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

}
