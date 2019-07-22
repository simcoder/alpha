import { PMAUser } from './../../models/user.interace';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Property } from '../../models/property.interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Input() properties:Property[];
  @Input() user:PMAUser;

  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    unit: new FormControl(null, Validators.required),
    propertyId:  new FormControl(null, Validators.required),
    residentId: new FormControl()
  });
  constructor() { }

  ngOnInit() {}

  onRegister() {
    if (this.registrationForm.valid) {
      this.submitForm.emit({form:this.registrationForm, user:this.user});
    }
  }

}
