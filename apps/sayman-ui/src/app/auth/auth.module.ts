import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
