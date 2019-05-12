import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateComponent } from './components/date/date.component';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MaterialModule } from './material.module';
import { SelectComponent } from './components/select/select.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DynamicFormComponent, 
                 InputComponent, 
                 ButtonComponent, 
                 SelectComponent, 
                 DateComponent, 
                 CheckboxComponent, 
                 DynamicFieldDirective],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    CheckboxComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [DynamicFormComponent, 
            InputComponent, 
            ButtonComponent, 
            SelectComponent, 
            DateComponent, 
            CheckboxComponent, 
            DynamicFieldDirective]
})
export class DynamicFormModule { }
