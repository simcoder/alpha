import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {}

  completed = false;

  completeStep(): void {
    this.completed = true;
  }
}
