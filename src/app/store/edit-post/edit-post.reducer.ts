// import { createReducer, on } from '@ngrx/store';
// import { IPost } from '../../shared/interface';
// import { getPostToEdit, getPostToEditFailed, getPostToEditSuccess } from './edit-post.action';
//
// // export interface IPostEdit {
// //   title: string,
// //   text: string,
// //   author: string,
// //   id: string,
// //   name: string,
// //   date: Date
// // }
// //
// // export const initialEditPost: IPostEdit = {
// //     title: '',
// //     text: '',
// //     author: '',
// //     id: '',
// //     name: '',
// //     date: new Date
// // }
//
// export const editState = 'edit';
//
// export const editReducer = createReducer(
//   initialEditPost,
//   on(getPostToEdit, (state, {postEdit}) => {
//     return ({
//       ...state,
//       postEdit
//     })
//   }),
//   on(getPostToEditSuccess, (state, {postEdit},) => {
//     console.log('state', state)
//     return ({
//       ...state,
//       postEdit
//     })
//   }),
//   on(getPostToEditFailed, (state, {error}) => {
//     return ({
//       ...state,
//       error
//     })
//   })
// )
//
