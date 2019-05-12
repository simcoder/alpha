import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../interfaces/form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  field: FieldConfig;
group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
