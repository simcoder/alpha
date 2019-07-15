import { Component } from '@angular/core';
import { resident$, selectedTab$, disablePayments$} from './app.defaults';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'payments';
  amountDue;
  selectdTabIndex;
  paymentDisabled;
  constructor() {}
  ngOnInit() {
    resident$.subscribe(resident=>{
      if(!!resident){
        if(resident.amountDue > 0){
          disablePayments$.next(false);
        } else {
          disablePayments$.next(true);
        }
        this.amountDue = resident.amountDue;
      }
    });
    selectedTab$.subscribe(index=>{
      this.selectdTabIndex = index;
    });
    disablePayments$.subscribe(xx=>{
      this.paymentDisabled = xx;
    })
  }

  onTabChanged(tab){
    selectedTab$.next(tab.index);
  }
}
