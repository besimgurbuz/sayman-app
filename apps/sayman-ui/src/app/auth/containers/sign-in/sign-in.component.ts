import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { PROGRESS_SUBJECT } from '../../../tokens';

@Component({
  selector: 'sayman-app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private progressSubject: Subject<boolean>;
  loginFormGroup: FormGroup;
  authenticationSubs: Subscription;
  redirectedSubs: Subscription;
  invalidCredentials = false;

  constructor(
    @Inject(PROGRESS_SUBJECT) progressSubject: Subject<boolean>,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
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

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.redirectedSubs = this.route.queryParams
      .pipe(
        map((params) => params.redirectReason === 'unauthenticated'),
        filter((isRedirected) => isRedirected),
        tap(() =>
          this._snackBar.open(
            'Looks like your session is expired. Shall we fix that?',
            'Close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.authenticationSubs?.unsubscribe();
    this.redirectedSubs?.unsubscribe();
  }

  handleLogin() {
    if (this.loginFormGroup.valid) {
      const { username, password } = this.loginFormGroup.controls;
      this.progressSubject.next(true);

      this.authenticationSubs = this.authService
        .authenticate(username.value, password.value)
        .subscribe(
          () => {
            this.progressSubject.next(false);
            this.router.navigate(['/dashboard']);
          },
          (error: HttpErrorResponse) => {
            let message = 'Username or password is incorrect.';
            let panelClass = '';
            this.progressSubject.next(false);

            if (error.status === 500 || error.status === 0) {
              message =
                'We are currently not able to log you in. Try again later.';
              panelClass = 'internal-error-modal';
            }

            this._snackBar.open(message, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: panelClass,
            });
          }
        );
    }
  }
}
