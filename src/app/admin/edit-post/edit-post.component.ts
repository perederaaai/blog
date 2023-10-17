import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostingServices } from '../../shared/posting.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, } from 'rxjs';
import { IPost } from '../../shared/interface';
import { AlertService } from '../shared/services/alert.service';
import { Store } from '@ngrx/store';
import { IState, selectPostList } from '../../store';
import { editPostAction } from '../../store/posts/post.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public editorContent: string;
  private post: IPost;
  public updFlag: boolean = false;
  public destroy$: Subject<void> = new Subject<void>();
  public editorConfig: any;
  public post$: Observable<IPost[]>

  constructor(
    private route: ActivatedRoute,
    private postService: PostingServices,
    private alert: AlertService,
    private fb: FormBuilder,
    private store$: Store<IState>
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  getData(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService.getById(postId)
      .subscribe((post: IPost) => {
        this.post = post;
        this.form.patchValue(post);
      });
  };

  initForm(): void {
    this.post$ = this.store$.select(selectPostList)
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }

  submit() {

    if (!this.form.valid) return;
    this.updFlag = true;
    this.store$.dispatch(editPostAction(this.form.value));
    // this.postService.update({
    //   ...this.post,
    //   ...this.form.value
    // })
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(() => {
    this.updFlag = false;
    // this.alert.success('Пост відредаговано!');
    this.form.reset();
    // })
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  };


}
