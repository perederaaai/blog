import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../../../shared/interface';

@Pipe({
  name: 'searchPosts',

})
export class SearchPipe implements PipeTransform {
  transform(posts: IPost[], search = ''): IPost[] {
    if (!search.trim()){
      return posts
    } else return posts.filter((post: IPost) =>{
      return post.title.toLowerCase().includes(search.toLowerCase())
    })

  }




}
