import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'sayman-app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() control: AbstractControl;
  @Input() errorMessages: { [prop: string]: string };

  constructor() {}

  getControlsErrorKeys(control: AbstractControl): string[] {
    return Object.keys(control.errors);
  }

  getErrorMessageOrEmpty(key: string) {
    return this.errorMessages?.[key] || '';
  }
}
