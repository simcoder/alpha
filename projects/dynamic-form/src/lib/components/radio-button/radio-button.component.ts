import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../interfaces/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
