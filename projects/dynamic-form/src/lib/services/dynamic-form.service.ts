import { Injectable } from '@angular/core';
import { FieldConfig } from '../interfaces/form';
import { InputType } from '../enums/input-type.enum';
import { Validators, FormGroup } from '@angular/forms';
const regConfig: FieldConfig[] = [
  {
    type: InputType.Input,
    label: "Username",
    inputType: "text",
    name: "name",
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Name Required"
      },
      {
        name: "pattern",
        validator: Validators.pattern("^[a-zA-Z]+$"),
        message: "Accept only text"
      }
    ]
  },
  {
    type: InputType.Input,
    label: "Email Address",
    inputType: "email",
    name: "email",
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Email Required"
      },
      {
        name: "pattern",
        validator: Validators.pattern(
          "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
        ),
        message: "Invalid email"
      }
    ]
  },
  {
    type: InputType.Input,
    label: "Password",
    inputType: "password",
    name: "password",
    validations: [
      {
        name: "required",
        validator: Validators.required,
        message: "Password Required"
      }
    ]
  },
  {
    type: InputType.Select,
    label: "Country",
    name: "country",
    value: "UK",
    options: ["India", "UAE", "UK", "US"]
  },
  {
    type: InputType.Button,
    label: "Save"
  }
];

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() {

  }

  getFormMetadata(): FieldConfig[] {
    return regConfig;
  }
}
