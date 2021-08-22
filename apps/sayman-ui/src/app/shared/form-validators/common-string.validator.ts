import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateString(
  regExp: RegExp,
  errorKey: string
): (control: AbstractControl) => ValidationErrors | null {
  return function (control) {
    return regExp.test(control.value) ? null : { [errorKey]: true };
  };
}

export function ValidateStringByBlockList(
  blockList: string[],
  errorKey: string,
  validationFunction: (blackList: string[], value: string) => boolean
): (control: AbstractControl) => ValidationErrors | null {
  return function (control: AbstractControl) {
    return validationFunction(blockList, control.value)
      ? { [errorKey]: true }
      : null;
  };
}
