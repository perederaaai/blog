import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFBTokens, IUserData } from '../../../shared/interface';
import { catchError, delay, Observable, Subject, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environments';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  public panelFlag: boolean = false;
  apiKey: string = 'AIzaSyDlsrpW5ceZKs3bUK9K4Nlf-aJ91UUgomA';




  constructor(private http: HttpClient,
              private router: Router) {
  }

  get token(): string | null {
    const expDate = localStorage.getItem('FB-token-exp');
    const fbToken = localStorage.getItem('FB-token');
    // console.log(expDate);
    if (!expDate || !fbToken  || (new Date() >= new Date(expDate))) {
      return null;
    } else {
      return localStorage.getItem('FB-token');
    }
  };

  logIn(user: IUserData): Observable<IFBTokens> {
    user.returnSecureToken = true;
    return this.http.post(`${environment.apiKey}${this.apiKey}`, user)
      .pipe(
        delay(700),
        catchError(this.handleError.bind(this)),
        tap(this.setToken),
      )
  };

  logOut(): void {
    this.setToken(null);
    this.router.navigate(['/admin', 'login'],{
      queryParams:{
        loginAgain: true
      }
    });
  };

  isAuthenticated(): boolean {
    return !!this.token
  };

  private setToken(response: any | null): void {
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000);

      localStorage.setItem('FB-token', response.idToken);
      localStorage.setItem('FB-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  };

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error$.next('Вказано невірні данні')
        break
    }
    return throwError(error);

  }
}
