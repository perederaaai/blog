import { Component, OnInit } from '@angular/core';
import { PostingServices } from '../shared/posting.services';
import { Observable } from 'rxjs';
import { IPost } from '../shared/interface';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    public posts$: Observable<IPost[]>;

    constructor(private postService: PostingServices) {
    }

    ngOnInit(): void {
        this.posts$ = this.postService.getAllPost();
    }

}
