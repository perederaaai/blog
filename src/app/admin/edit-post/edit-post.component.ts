import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostingServices } from '../../shared/posting.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { IPost } from '../../shared/interface';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public value: string = '';
  public editorContent: any;
  private post: IPost;
  public updFlag: boolean = false;
  updSub: Subscription;


  constructor(
    private router: ActivatedRoute,
    private http: PostingServices,
    private alert: AlertService,
  ) {
  }

  ngOnInit() {
    this.router.params
      .pipe(
        switchMap(params => {
          return this.http.getById(params['id'])
        })
      )
      .subscribe((post: IPost) => {
        this.form = new FormGroup<any>({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
        this.post = post
      })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.updFlag = true

    this.updSub = this.http.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.updFlag = false
      this.alert.success('Пост відредаговано!')
      this.form.reset()
    })
  };

  ngOnDestroy() {
    if (this.updSub) {
      this.updSub.unsubscribe()
    }
  }


}
