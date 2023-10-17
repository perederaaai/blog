import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {  adminAuthGetUserDataFailed, adminAuthGetUserDataSuccess, adminAuthGetUserData } from './auth.action';
import { IFBTokens } from '../../shared/interface';

export interface IAuth {
  userData: IFBTokens | null,
  error: HttpErrorResponse | null,
}

export const initialAuth: IAuth = {
  userData: null,
  error: null
}

export const authState = 'auth';

export const authReducer = createReducer(
  initialAuth,
  on(adminAuthGetUserData, (state) => {
    return ({
      ...state,
    })
  }),
  on(adminAuthGetUserDataSuccess, (state, {userDataTokens},) => {
    console.log('state', state)
    return ({
      ...state,
      userDataTokens: userDataTokens
    })
  }),
  on(adminAuthGetUserDataFailed, (state, {}) => {
    return ({
      ...state,
    })
  })
)

