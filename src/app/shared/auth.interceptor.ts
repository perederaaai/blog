import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../admin/shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService : AuthService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated())
    req = req.clone({
      setParams:{
        auth: this.authService.token as string
      }
    });
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) =>{
          if (error.status === 401){
            this.authService.logOut();
          }
          return throwError(() => error)
        })
      );
  }

}
