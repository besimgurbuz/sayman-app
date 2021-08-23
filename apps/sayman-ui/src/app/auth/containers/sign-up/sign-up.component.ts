import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ValidateString } from '../../../shared/form-validators/common-string.validator';
import { ValidateFieldsAreMatched } from '../../../shared/form-validators/match.validator';
import { PROGRESS_SUBJECT } from '../../../tokens';
import { EMAIL_REGEX } from '../../../utils/email.regex';
import { User } from '../../models/user.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'sayman-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  progressSubject: Subject<boolean>;
  signUpGroup: FormGroup;
  registerSubs: Subscription;

  signUpFormErrorMessages: Record<string, unknown> = {
    general: {
      fieldsNotMatched:
        'Password confirmation failed. Confirmation must be the same as the password',
    },
    username: {
      minlength: 'Username must be at least 5 characters long',
      maxlength: 'Username can be up to 20 characters long',
      includesInvalidChars:
        'Username cannot contain invalid characters (!, ", £, $, etc.)',
    },
    email: {
      email: 'Email should be valid',
    },
    password: {
      minlength: 'Password must be at least 8 characters long',
    },
  };

  constructor(
    @Inject(PROGRESS_SUBJECT) progressSubject: Subject<boolean>,
    private fb: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.progressSubject = progressSubject;
  }

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
            Validators.maxLength(20),
            ValidateString(/^[a-zA-Z0-9_]+$/, 'includesInvalidChars'),
          ],
        ],
        email: [
          '',
          [Validators.required, ValidateString(EMAIL_REGEX, 'email')],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [ValidateFieldsAreMatched('password', 'confirmPassword')],
      }
    );
  }

  ngOnDestroy() {
    this.registerSubs?.unsubscribe();
  }

  handleRegister() {
    if (!this.signUpGroup.invalid) {
      this.progressSubject.next(true);
      const newUser: User = {
        username: this.signUpGroup.controls.username.value,
        email: this.signUpGroup.controls.email.value,
        password: this.signUpGroup.controls.password.value,
      };

      this.registerSubs = this.registerService.register(newUser).subscribe(
        (res) => {
          this.progressSubject.next(false);
          this.router.navigate(['/user/login']);
        },
        (error: HttpErrorResponse) => {
          let message = 'Unexpected error accoured.';
          this.progressSubject.next(false);

          if (error.status === 500 || error.status === 0) {
            message =
              'We are currently unable to fulfill your registration request. Try again later.';
          } else if (error.status === 400 || error.status === 409) {
            const errors = error.error as Record<string, string>;
            message = errors.message || Object.values(errors).join('.\n');
          }

          this._snackBar.open(message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'internal-error-modal',
          });
        }
      );
    }
  }
}
