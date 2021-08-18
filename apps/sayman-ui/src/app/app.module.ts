import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { LandingComponent } from './components/landing/landing.component';
import { BASE_URL_TOKEN } from './tokens';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LandingComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: BASE_URL_TOKEN,
      useValue: `${environment.baseUrl}/api/v1`,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
