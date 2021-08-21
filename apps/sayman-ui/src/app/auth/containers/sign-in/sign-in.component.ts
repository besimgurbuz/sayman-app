import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'sayman-app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;
  authenticationSubs: Subscription;
  redirectedSubs: Subscription;
  invalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

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
              verticalPosition: 'top',
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
      this.authenticationSubs = this.authService
        .authenticate(username.value, password.value)
        .subscribe(
          () => this.router.navigate(['/dashboard']),
          () => (this.invalidCredentials = true)
        );
    }
  }
}
