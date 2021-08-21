import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  COMMON_BLOCKED_INCLUDE_LETTERS,
  COMMON_BLOCKED_STARTS_WITH_LETTERS,
  ValidateStringByBlockList,
} from '../../../shared/form-validators/common-string.validator';
import { ValidateFieldsAreMatched } from '../../../shared/form-validators/match.validator';

@Component({
  selector: 'sayman-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpGroup: FormGroup;
  signUpFormErrorMessages: Record<string, unknown> = {
    general: {
      fieldsNotMatched:
        'Password confirmation failed. Confirmation must be the same as the password',
    },
    username: {
      minlength: 'Username must be at least 5 characters long',
      maxlength: 'Username can be up to 12 characters long',
      includesInvalidChars:
        'Username cannot contain invalid characters. (!, ", £, $, etc.)',
      startsWithInvalidChars: "Username cannot start with a number or '.'",
    },
    password: {
      minlength: 'Password must be at least 8 characters long',
    },
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.signUpGroup = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(12),
            ValidateStringByBlockList(
              COMMON_BLOCKED_INCLUDE_LETTERS,
              'includesInvalidChars',
              (blockedList: string[], value) =>
                blockedList.some((blocked) => value.includes(blocked))
            ),
            ValidateStringByBlockList(
              COMMON_BLOCKED_STARTS_WITH_LETTERS,
              'startsWithInvalidChars',
              (blockedList: string[], value) =>
                blockedList.some((blocked) => value.startsWith(blocked))
            ),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [ValidateFieldsAreMatched('password', 'confirmPassword')],
      }
    );
  }

  handleRegister() {
    console.log(this.signUpGroup);
  }
}
