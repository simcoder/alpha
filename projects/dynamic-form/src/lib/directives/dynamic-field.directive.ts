import { Directive, ViewContainerRef, ComponentFactoryResolver, OnInit, Input } from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { FieldConfig } from '../interfaces/form';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from '../components/select/select.component';
import { DateComponent } from '../components/date/date.component';
import { RadioButtonComponent } from '../components/radio-button/radio-button.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadioButtonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    if(this.field){

    }
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type.toLowerCase()]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
