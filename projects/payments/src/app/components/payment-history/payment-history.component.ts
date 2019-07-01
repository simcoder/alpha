import { Component, OnInit } from '@angular/core';
export interface PaymentHistory {
  date: string;
  position: number;
  unit: string;
  type: string;
  action: any;
  amount: string;
  fee: string;
  status: string;
  total: number;
}

const ELEMENT_DATA: PaymentHistory[] = [
  {position: 1, date: 'Hydrogen', unit: '1.0079', type: 'e-Check', action:'cancel', amount: '', fee: '', status: 'authorized', total: 1234},
  {position: 2, date: 'Hydrogen', unit: '1.0079', type: 'e-Check', action:'-', amount: '', fee: '', status: 'completed', total: 1234},
  {position: 3, date: 'Hydrogen', unit: '1.0079', type: 'e-Check', action:'-', amount: '', fee: '', status: 'completed', total: 1234},
  {position: 4, date: 'Hydrogen', unit: '1.0079', type: 'e-Check', action:'-', amount: '', fee: '', status: 'completed', total: 1234}
];
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'unit', 'type', 'status', 'action', 'amount', 'fee', 'total'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
