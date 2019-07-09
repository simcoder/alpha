import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-saved-payment',
  templateUrl: './saved-payment.component.html',
  styleUrls: ['./saved-payment.component.scss']
})
export class SavedPaymentComponent implements OnInit {
  @Input() payment: any;
  
  constructor() { }

  async ngOnInit() {}

}
