import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateFieldsAreMatched(
  ...fields: string[]
): (control: AbstractControl) => ValidationErrors | null {
  return function (formGroup: AbstractControl) {
    const values = fields.map((field) => formGroup.get(field).value);
    return values.every((value) => value === values[0])
      ? null
      : { fieldsNotMatched: true };
  };
}
