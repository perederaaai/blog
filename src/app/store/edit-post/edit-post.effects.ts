// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { AlertService } from '../../admin/shared/services/alert.service';
// import { Router } from '@angular/router';
// import { adminAuthGetUserDataFailed } from '../auth/auth.action';
// import { catchError, map, of, switchMap } from 'rxjs';
// import { getPostToEdit, getPostToEditSuccess } from './edit-post.action';
// import { PostingServices } from '../../shared/posting.services';
//
// @Injectable()
//
// export class EditPostEffects {
//
//   constructor(
//     private actions$: Actions,
//     private postService: PostingServices,
//     private alert: AlertService,
//     public router: Router
//   ) {
//   }
//
//
//   editPost$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getPostToEdit),
//       switchMap(action =>
//         this.postService.update(action.postEdit).pipe(
//           map((response) => {
//             this.alert.success('Пост відредаговано!');
//             return getPostToEditSuccess({postEdit: response})
//           }),
//           catchError((error) => {
//             return of(adminAuthGetUserDataFailed({error}));
//           })
//         )
//       )
//     )
//   );
// }
