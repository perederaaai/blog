// import { IPostState, postfeaturekey, postReducer } from './post.reducer';
// import { ActionReducerMap, createSelector } from '@ngrx/store';
// import { getPostListSelector } from './post.selector';
//
// export interface IState {
//   [postfeaturekey]: IPostState
// }
//
// export const reducers: ActionReducerMap<IState, any> = {
//   [postfeaturekey]: postReducer
// };
// export const getPostState = (state: IState) => state.posts;
// export const selectPostList = createSelector(getPostState, getPostListSelector);

import { IInitialPostData, postsReducer, postState } from './posts/post.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { getPostListSelector } from './posts/post.selector';
import { authReducer, authState, IAuth } from './auth/auth.reducer';
import { isAuthSelector } from './auth/auth.selector';

export interface IState {
  [postState]: IInitialPostData,
  [authState]: IAuth,
}

export const reducers: ActionReducerMap<IState, any> = {
  [postState]: postsReducer,
  [authState]: authReducer,
}

export const getPostState = (state: IState) => state[postState];
export const selectPostList = createSelector(getPostState, getPostListSelector);

export const getAuthState = (state: IState) => state[authState];
export const selectAuthList = createSelector(getAuthState, isAuthSelector);

// export const getEditState = (state: IState) => state[editState];
// export const selectEdit = createSelector(getEditState, editPostSelector);

