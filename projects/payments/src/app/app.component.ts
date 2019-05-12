import { Component } from '@angular/core';
import { FieldConfig, DynamicFormService } from 'projects/dynamic-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  regConfig:FieldConfig[]
  title = 'payments';
 
  constructor(private formService: DynamicFormService){
     this.regConfig = formService.getFormMetadata();
  }
  
  submit(event){
  }
}
