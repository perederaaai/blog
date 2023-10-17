// import { createAction, props } from '@ngrx/store';
// import { IPost } from '../shared/interface';
//
// export const ADD_POST = '[CREATE_POST_PAGE] add post';
// export const GET_POST_LIST = '[DASHBOARD_PAGE] get all post';
// export const DELETE_POST = '[DASHBOARD_PAGE] delete post';
//
// export const addPostAction = createAction(
//   ADD_POST,
//   props<{ post: IPost }>()
// );
//
// export const getPostList = createAction(
//   GET_POST_LIST,
//   props<{ posts: IPost[] }>()
// );
//
// export const deletePostAction = createAction(
//   DELETE_POST,
//   props<{ post: IPost }>()
// );
//
//

import { createAction, props } from '@ngrx/store';
import { IPost } from '../../shared/interface';
import { HttpErrorResponse } from '@angular/common/http';

export const ADD_NEW_POST = '[CREATE_PAGE] add post';

export const DELETE_POST = '[DASHBOARD_PAGE] remove post';
export const DELETE_POST_SUCCESS = '[DASHBOARD_PAGE] remove post success';
export const DELETE_POST_FAILED = '[DASHBOARD_PAGE] remove post failed';

export const VIEW_POST = '[POST_PAGE] post visited';

// effects
export const GET_POST_LIST = '[DASHBOARD_PAGE] get post list';
export const GET_POST_LIST_SUCCESS = '[DASHBOARD_PAGE] get post list success';
export const GET_POST_LIST_FAILED = '[DASHBOARD_PAGE] get post list failed';


export const EDIT_POST = '[EDIT_PAGE] edit post ';
export const EDIT_POST_SUCCESS = '[EDIT_PAGE] edit post success ';
export const EDIT_POST_FAILED = '[EDIT_PAGE] edit post failed ';

export const GET_POST_ID = '[EDIT_PAGE] get post id ';
export const GET_POST_ID_SUCCESS = '[EDIT_PAGE] get post id success ';
export const GET_POST_ID_FAILED = '[EDIT_PAGE] get post id failed ';

export const getPostList = createAction(
  GET_POST_LIST,
  // props<{postList : IPost[]}> ()
);
export const getPostListSuccess = createAction(
  GET_POST_LIST_SUCCESS,
  props<{ postList: IPost[] }>()
);
export const getPostListFailed = createAction(
  GET_POST_LIST_FAILED,
  props<{ error: HttpErrorResponse }>()
);
export const addPost = createAction(
  ADD_NEW_POST,
  props<{ newPost: IPost }>()
);

export const removePost = createAction(
  DELETE_POST,
  props<{ id: string }>()
);
export const removePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: string }>()
);
export const removePostFailed = createAction(
  DELETE_POST_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const editPostAction = createAction(
  EDIT_POST,
  props<{ post: IPost }>()
);
export const editPostActionSuccess = createAction(
  EDIT_POST_SUCCESS,
  props<{ editedPost: IPost }>()
);
export const editPostActionFailed = createAction(
  EDIT_POST_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const addPostCounter = createAction(
  VIEW_POST,
  props<{ post: IPost }>()
);
