import { InputType } from '../enums/input-type.enum';

export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: InputType;
    value?: any;
    validations?: Validator[];
}