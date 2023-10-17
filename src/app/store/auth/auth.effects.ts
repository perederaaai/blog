import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from '../../admin/shared/services/alert.service';
import { adminAuthGetUserData, adminAuthGetUserDataFailed, adminAuthGetUserDataSuccess } from './auth.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../admin/shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alert: AlertService,
    public router: Router
  ) {
  }


  adminAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminAuthGetUserData),
      switchMap(action =>
        this.authService.logIn(action.userData).pipe(
          map((userDataAuthToken) => {
            this.router.navigate(['/admin', 'dashboard']);
                this.alert.warning('Авторизацію пройдено');
            return adminAuthGetUserDataSuccess({userDataTokens: userDataAuthToken})
          }),
          catchError((error) => {
            return of(adminAuthGetUserDataFailed({error}));
          })
        )
      )
    )
  );
}
