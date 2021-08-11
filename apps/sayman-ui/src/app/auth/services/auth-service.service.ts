import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../../base-url.token';

@Injectable()
export class AuthService {
  loginUrl: string;
  registerUrl: string;

  constructor(@Inject(BASE_URL_TOKEN) baseUrl, private http: HttpClient) {
    this.loginUrl = `${baseUrl}/login`;
    this.registerUrl = `${baseUrl}/register`;
  }

  login(username: string, password: string): Observable<HttpHeaderResponse> {
    return this.http.post<HttpHeaderResponse>(this.loginUrl, {
      username,
      password,
    });
  }
}
