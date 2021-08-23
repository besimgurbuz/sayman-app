import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { BASE_URL_TOKEN } from './tokens';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LandingComponent],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule,
    MatProgressBarModule,
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
