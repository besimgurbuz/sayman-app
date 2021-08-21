import { Component, OnInit } from '@angular/core';
import {
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
