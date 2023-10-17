import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost } from '../../shared/interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PostingServices } from '../../shared/posting.services';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { Store } from '@ngrx/store';
import { IState, selectPostList } from '../../store';
import { getPostList, removePost } from '../../store/posts/post.action';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: IPost[] = [];
  public value: string = '';
  public search: string;
  public destroy$: Subject<void> = new Subject<void>();
  public posts$: Observable<IPost[]>;


  constructor(
    private postService: PostingServices,
    private router: Router,
    private alert: AlertService,
    private store$: Store<IState>,
  ) {
  }

  ngOnInit() {
    this.getData();
  };

  getData() {
    this.posts$ = this.store$.select(selectPostList);
    this.store$.dispatch(getPostList());
    // this.postService.getAllPost()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((posts: IPost[]) => {
    //     if (!posts) return;
    //     this.store$.dispatch(getPostList({postList: posts}));
    //   });

  }

  openPost(id: string): void {
    this.router.navigate(['/post', id, 'edit']);
  }

  removePost(post: IPost): void {
    this.store$.dispatch(removePost({id: post.id}))
    this.postService.remove(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.alert.danger('Пост видалено!');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
