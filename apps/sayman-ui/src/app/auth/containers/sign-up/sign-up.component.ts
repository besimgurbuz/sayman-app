import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ValidateString } from '../../../shared/form-validators/common-string.validator';
import { ValidateFieldsAreMatched } from '../../../shared/form-validators/match.validator';
import { User } from '../../models/user.model';
import { RegisterService } from '../../services/register.service';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
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
            Validators.maxLength(20),
            ValidateString(/^[a-zA-Z0-9_]+$/, 'includesInvalidChars'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [ValidateFieldsAreMatched('password', 'confirmPassword')],
      }
    );
  }

  handleRegister() {
    if (!this.signUpGroup.invalid) {
      const newUser: User = {
        username: this.signUpGroup.controls.username.value,
        email: this.signUpGroup.controls.email.value,
        password: this.signUpGroup.controls.password.value,
      };

      this.registerService
        .register(newUser)
        .subscribe((res) => console.log(res));
    }
  }
}
