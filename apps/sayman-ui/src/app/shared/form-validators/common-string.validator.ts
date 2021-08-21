import { AbstractControl, ValidationErrors } from '@angular/forms';

export const COMMON_BLOCKED_INCLUDE_LETTERS: string[] = [
  '/',
  '\\',
  '!',
  '"',
  '£',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '=',
  ',',
  '|',
  '<',
  '>',
  '{',
  '}',
  '[',
  ']',
  '@',
  '~',
  '?',
  '#',
  '+',
];

export const COMMON_BLOCKED_STARTS_WITH_LETTERS: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
];

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
