import {
  HttpClient,
  HttpHeaderResponse,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { BASE_URL_TOKEN } from '../../tokens';

@Injectable()
export class AuthService {
  private readonly TOKEN_KEY = 'API_TOKEN';
  private readonly AUTHORIZATION = 'Authorization';
  public readonly isAuthenticated$ = new BehaviorSubject<boolean>(false);

  loginUrl: string;
  registerUrl: string;

  constructor(
    @Inject(BASE_URL_TOKEN) baseUrl,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.loginUrl = `${baseUrl}/login`;
    this.registerUrl = `${baseUrl}/register`;
    this.isAuthenticated$.next(this.isAuthenticated());
  }

  authenticate(
    username: string,
    password: string
  ): Observable<HttpResponse<unknown>> {
    return this.http
      .post(
        this.loginUrl,
        {
          username,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) =>
          this.saveTokenToLocalStorage(response.headers.get(this.AUTHORIZATION))
        ),
        shareReplay()
      );
  }

  logout(): void {
    this.removeTokenFromLocalStorage();
    this.isAuthenticated$.next(false);
  }

  removeTokenFromLocalStorage(): void {
    this.localStorageService.removeItem(this.TOKEN_KEY);
  }

  saveTokenToLocalStorage(token: string): void {
    this.localStorageService.setItem(
      this.TOKEN_KEY,
      token.replace('Bearer ', '')
    );
    this.isAuthenticated$.next(true);
  }

  isAuthenticated(): boolean {
    return this.localStorageService.getItem(this.TOKEN_KEY) !== null;
  }
}
