import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { resident$ } from '../../app.defaults';
import { first } from 'rxjs/operators';
export const paymentAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  isLinear = false;
  selectedStepIndex;
  paymentAmountForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentAmountForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
    resident$.pipe().subscribe(resident=>{
      if(!!resident){
        this.paymentAmountForm.controls['amount'].setValue(resident.amountDue);
        paymentAmount$.next(resident.amountDue);
      }
    });
  }
  onChange(event){
    paymentAmount$.next( this.paymentAmountForm.controls['amount'].value);
  }

}
