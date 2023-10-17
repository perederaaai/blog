import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../interface';
import { Observable } from 'rxjs';
import { selectPostList, IState } from '../../../store';
import { addPostCounter } from '../../../store/posts/post.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() post: IPost;
  public postsStore$: Observable<IPost[]>;

  constructor(private router: Router,
              private store$: Store<IState>
              ) {
  }

  goToPost(post:IPost):void {
    this.postsStore$ = this.store$.select(selectPostList)
    this.store$.dispatch(addPostCounter({post: post}))
    this.router.navigate(['/post', this.post.id])
  }
}
