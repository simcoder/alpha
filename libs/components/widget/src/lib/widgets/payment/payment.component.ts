import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() amountDue: number = 0;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onPaymentClicked() {
    this.router.navigateByUrl("home;preserveFragment=true/(details:payments)")
  }

  onMaintenanceClicked() {
    this.router.navigateByUrl("home;preserveFragment=true/(details:maintenance)")
  }

}
