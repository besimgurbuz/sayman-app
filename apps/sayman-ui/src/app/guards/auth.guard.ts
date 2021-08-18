import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const result = this.authService.isAuthenticated();

    if (result) {
      return true;
    }

    this.router.navigate(['/user/login'], {
      queryParams: { redirectReason: 'unauthenticated' },
    });
    return false;
  }
}
