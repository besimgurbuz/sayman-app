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

export const COMMON_BLOCKED_START_OR_END_WITH_LETTERS: string[] = ['.'];

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
