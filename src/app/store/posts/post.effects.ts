import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostingServices } from '../../shared/posting.services';
import { AlertService } from '../../admin/shared/services/alert.service';
import {
  editPostAction,
  editPostActionFailed,
  editPostActionSuccess,
  getPostList,
  getPostListFailed,
  getPostListSuccess,
  removePost,
  removePostFailed,
  removePostSuccess
} from './post.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostingServices,
    private alert: AlertService,
  ) {
  }

  getPostList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostList),
      switchMap(action =>
        this.postService.getAllPost().pipe(
          map(postList => getPostListSuccess({postList: postList})),
          catchError((err) => {
            return of(getPostListFailed({error: err}));
          })
        )
      )
    )
  );

  removePostFromList = createEffect(() => {
    return this.actions$.pipe(
      ofType(removePost),
      switchMap((action) =>
        this.postService.remove(action.id).pipe(
          map(() => {
            this.alert.danger('Пост видалено!');
            return removePostSuccess({id: action.id})
          }),
          catchError((err) => {
            return of(removePostFailed({error: err}))
          })
        )
      )
    );
  });

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPostAction),
      switchMap(action =>
        this.postService.update(action.post).pipe(
          map((response) => {
            action.post = response;
            this.alert.success('Пост відредаговано!');
            return editPostActionSuccess({editedPost: action.post})
          }),
          catchError((error) => {
            return of(editPostActionFailed({error}));
          })
        )
      )
    )
  );

}
