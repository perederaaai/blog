
import { IInitialPostData } from './post.reducer';
import { IPost } from '../../shared/interface';

export const getPostListSelector = (state: IInitialPostData): IPost[] => state.newPostList;
