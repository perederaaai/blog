import { Component, OnInit } from '@angular/core';
import { PostingServices } from '../shared/posting.services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../shared/interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  public posts$ : Observable<IPost[]>


  constructor(
    private postServise: PostingServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.posts$ = this.postServise.getAllPost()
  }

}
