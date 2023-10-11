import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() post: IPost;
  constructor(private router: Router) {
  }

  goToPost():void {
    this.router.navigate(['/post', this.post.id])
  }
}
