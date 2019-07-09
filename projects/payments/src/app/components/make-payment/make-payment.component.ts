import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
export const paymentAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  isLinear = false;
  paymentAmountForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentAmountForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  onChange(event){
    console.log(this.paymentAmountForm.controls['amount'].value);
    paymentAmount$.next( this.paymentAmountForm.controls['amount'].value);
  }

}
