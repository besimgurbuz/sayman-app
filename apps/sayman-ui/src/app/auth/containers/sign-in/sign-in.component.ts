import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'sayman-app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin() {
    if (this.loginFormGroup.valid) {
      const { username, password } = this.loginFormGroup.controls;
      this.authService
        .login(username.value, password.value)
        .subscribe((res) => console.log(res));
    }
  }
}
