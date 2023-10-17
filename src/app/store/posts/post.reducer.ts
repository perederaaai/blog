// import { createReducer, on } from '@ngrx/store';
// import { addPostAction, deletePostAction, getPostList } from './post.action';
// import { IPost } from '../shared/interface';
//

// export const postfeaturekey = 'posts';


// export interface IPostState {
//   postList: IPost[],
//   newPost: IPost | null,
// }

//
// export const initialPostState: IPostState = {
//   postList: [],
//   newPost: null,
// };
//
// export const postReducer = createReducer(
//   initialPostState,
//   on(addPostAction, (state, {post}) => {
//     console.log(state)
//     return ({
//       ...state,
//       newPost: post
//     });
//   }),
//   on(getPostList, (state, {posts}) => {
//     return ({
//       ...state,
//       postList: posts
//     })
//   }),
//   on(deletePostAction, (state, {post}) => {
//     const newPostList = state.postList.filter(item => item.id != post.id)
//     return ({
//       ...state,
//       postList: newPostList
//     });
//   }),
// )

import { IPost } from '../../shared/interface';
import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  addPostCounter,
  editPostAction,
  editPostActionFailed,
  editPostActionSuccess,
  getPostList,
  getPostListFailed,
  getPostListSuccess,
  removePost,
  removePostSuccess
} from './post.action';
import { HttpErrorResponse } from '@angular/common/http';

export interface IInitialPostData {
  newPostList: IPost[],
  newPost: IPost | null,
  removedPost: IPost | null,
  editPost: IPost | null,
  viewPost: {
    post: IPost | null,
    counter: number,
  },
  error: HttpErrorResponse | null,
}

export const initialPosts: IInitialPostData = {
  newPostList: [],
  newPost: null,
  removedPost: null,
  editPost: null,
  viewPost: {
    post: null,
    counter: 0
  },
  error: null,
}

export const postState = 'postList';

export const postsReducer = createReducer(
  initialPosts,
  on(getPostList, (state) => {
    return ({
      ...state
    });
  }),
  on(getPostListSuccess, (state, {postList}) => {
    return ({
      ...state,
      newPostList: postList
    })
  }),
  on(getPostListFailed, (state, {error}) => {
    return ({
      ...state,
      error: error,
    })
  }),

  on(addPost, (state, {newPost}) => {
    return ({
      ...state,
      newPost: {
        ...newPost,
        first: true
      },

    });
  }),
  on(removePost, (state, {}) => {
    // const newPostList = state.newPostList.filter(post => post.id != id);
    return ({
      ...state
    });
  }),
  on(removePostSuccess, (state, {id}) => {
    const newPostList = state.newPostList.filter(post => post.id != id);
    return ({
      ...state,
      newPostList: newPostList
    });
  }),

  on(editPostAction, (state) => {
    return ({
      ...state,
    })
  }),
  on(editPostActionSuccess, (state, {editedPost},) => {
    const updPostList = state.newPostList.map((post) => {
      if (post?.id === editedPost.id) {
        post = {...editedPost}
        return post;
      }
      return post
    })
    return ({
      ...state,
      // editedPost,
      newPostList: {...updPostList},
    })
  }),
  on(editPostActionFailed, (state, {error}) => {
    return ({
      ...state,
      error
    })
  }),

  on(addPostCounter, (state, {post}) => {
    return ({
      ...state,
      viewPost: {
        post: post,
        counter: state.viewPost.counter + 1
      }
    });
  }),
)
