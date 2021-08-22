import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../../tokens';
import { User, CreateUserError } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  readonly registerUrl;

  constructor(
    @Inject(BASE_URL_TOKEN) baseUrl: string,
    private http: HttpClient
  ) {
    this.registerUrl = `${baseUrl}/register`;
  }

  register(user: User): Observable<CreateUserError | User> {
    return this.http.post<CreateUserError | null>(this.registerUrl, user);
  }
}
