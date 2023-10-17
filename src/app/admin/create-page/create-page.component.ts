import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPost } from '../../shared/interface';
import { PostingServices } from '../../shared/posting.services';
import { AlertService } from '../shared/services/alert.service';
import { Store } from '@ngrx/store';
import { selectPostList, IState } from '../../store';
import { Observable } from 'rxjs';
import { addPost } from '../../store/posts/post.action';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePostAdminComponent implements OnInit {

    public form: FormGroup;
    public editorContent: string;
    public editorConfig = {
        placeholderText: 'Поле для тексту'
    };
    public newPost$: Observable<IPost[]>;

    constructor(private postService: PostingServices,
                private alert: AlertService,
                private fb: FormBuilder,
                private store$: Store<IState>,
    ) {
    }

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            text: ['', [Validators.required, Validators.minLength(1)]],
            author: ['', [Validators.required]],
            id: ['']
        });
    }


    createPost() {
        this.newPost$ = this.store$.select(selectPostList)

        if (!this.form.valid) return
        const post: IPost = {...this.form.value, date: new Date()}

        this.postService.create(post).subscribe((newPost) => {
            this.form.reset()
            this.alert.success('Публікацію надіслано')
            this.store$.dispatch(addPost({newPost: newPost}))
        })
    };


}
