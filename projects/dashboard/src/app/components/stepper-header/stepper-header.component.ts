import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.css']
})
export class StepperHeaderComponent implements OnInit {
  @Input() steps: any[];
  @Output()  stepClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onStepClick(step){
    this.stepClick.emit(step);
  }

}
