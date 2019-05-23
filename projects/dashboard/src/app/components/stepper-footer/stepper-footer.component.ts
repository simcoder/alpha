import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper-footer',
  templateUrl: './stepper-footer.component.html',
  styleUrls: ['./stepper-footer.component.css']
})
export class StepperFooterComponent implements OnInit {
  @Output()  next = new EventEmitter();
  @Output()  previous = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  nextClicked(event){
   this.next.emit();
  }
  previousClicked(event){
     this.previous.emit();
  }

}
