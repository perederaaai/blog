import { Component, forwardRef, Input } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';


@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ]
})


export class CustomInputComponent implements ControlValueAccessor, Validator {
    @Input() inputType: string = 'text';
    @Input() inputClass: string = 'validation-input';
    @Input() label: string;
    @Input() requiredText: string = 'This field is required!';
    @Input() lenghtText: number;
    @Input() placeholder: string;
    public value: string;

    public onChange: (p: any) => void = () => {};
    public onTouched: () => void = () => {};

    public control: AbstractControl | null = null;

    writeValue(value: string) {
        this.value = value;
    };

    registerOnChange(fn: any) {
        this.onChange = fn
    };

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    };

    changeValue(event: any) {
        this.value = event.target.value;
        this.onTouched();
        this.onChange(this.value);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control) return null;
        this.control = control;
        return control.value ? null : {...control.errors};
    }
}
