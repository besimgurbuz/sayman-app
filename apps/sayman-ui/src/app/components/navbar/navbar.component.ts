import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'sayman-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('toolbar') matToolbar: MatToolbar;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;
  inDashboardSubs: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inDashboardSubs = this.isInDashboard$.subscribe((inDashboard) => {
      const toolbarClassList = this.matToolbar._elementRef.nativeElement
        .classList;
      if (inDashboard) {
        toolbarClassList.add('dashboard-toolbar');
      } else {
        toolbarClassList.remove('dashboard-toolbar');
      }
    });
  }

  ngOnDestroy(): void {
    this.inDashboardSubs.unsubscribe();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  get isInDashboard$(): Observable<boolean> {
    return this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((navEnd: NavigationEnd) => navEnd.urlAfterRedirects === '/dashboard')
    );
  }
}
