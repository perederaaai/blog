import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IFBTokens, IUser } from '../../shared/interface';

export const ADMIN_AUTH = '[ADMIN_PAGE] admin auth ';
export const ADMIN_AUTH_SUCCESS = '[ADMIN_PAGE] admin auth success ';
export const ADMIN_AUTH_FAILED = '[ADMIN_PAGE] admin auth failed ';

export const adminAuthGetUserData = createAction(
  ADMIN_AUTH,
  props<{ userData: IUser }>()
);
export const adminAuthGetUserDataSuccess = createAction(
  ADMIN_AUTH_SUCCESS,
  props<{ userDataTokens: IFBTokens }>()
);
export const adminAuthGetUserDataFailed = createAction(
  ADMIN_AUTH_FAILED,
  props<{ error: HttpErrorResponse }>()
);
