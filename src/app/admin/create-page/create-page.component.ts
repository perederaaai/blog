import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from '../../shared/interface';
import { PostingServices } from '../../shared/posting.services';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePostAdminComponent implements OnInit {

  form: FormGroup;
  editorContent: any;
  public value: string;


  constructor(private postService: PostingServices,
              private alert: AlertService,
  ) {
  }


  ngOnInit() {
    this.form = new FormGroup<any>({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      author: new FormControl('', [
        Validators.required
      ]),
      id: new FormControl(''),
    });

    this.value = '';
  };

  createPost() {
    if (this.form.invalid) {
      return
    }
    const post: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
      id: this.form.value.id,
    }
    this.postService.create(post).subscribe((res) => {
      this.form.reset()
      this.alert.success('Публікацію надіслано')


    })
  };


}
