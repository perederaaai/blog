import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/interface';
import { ActivatedRoute } from '@angular/router';
import { PostingServices } from '../shared/posting.services';
import { Observable, switchMap } from 'rxjs';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

    public posts$: Observable<IPost>;

    constructor(
        private router: ActivatedRoute,
        private postService: PostingServices,
    ) {
    }

    ngOnInit(): void {
        this.getPost();
    }

    getPost(): void {
        this.posts$ = this.router.params.pipe(
            switchMap(params => {
                return this.postService.getById(params['id']);
            })
        );
    }


}
