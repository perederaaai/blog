import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost } from '../../shared/interface';
import { Subject, takeUntil } from 'rxjs';
import { PostingServices } from '../../shared/posting.services';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

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

    constructor(
        private postService: PostingServices,
        private router: Router,
        private alert: AlertService,
    ) {
    }

    ngOnInit() {
        this.getData();
    };

    getData() {
        this.postService.getAllPost()
            .pipe(takeUntil(this.destroy$))
            .subscribe((posts: IPost[]) => {
                this.posts = posts;
            });
    }

    openPost(id: string): void {
        this.router.navigate(['/post', id, 'edit']);
    }

    removePost(id: string): void {
        this.postService.remove(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.posts = this.posts.filter(post => post.id != id);
                this.alert.danger('Пост видалено!');
            })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
