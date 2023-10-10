import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { IPost } from '../../shared/interface';
import { Subscription } from 'rxjs';
import { PostingServices } from '../../shared/posting.services';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{

  public posts: IPost[] = [];
  public inSub: Subscription;
  public remSub: Subscription;
  public value: string ='';
  search: string;

  constructor(
    private postS: PostingServices,
    private router: Router,
    private alert: AlertService,
    ) {
  }
  ngOnInit() {
    this.inSub =  this.postS.getAllPost().subscribe((posts: IPost[])=>{
      this.posts = posts
    });
  };
  openPost(id: string ) {
    this.router.navigate(['/post', id, 'edit'])
    console.log(id)
  };

  removePost(id: string){

   this.remSub = this.postS.remove(id).subscribe( () =>{
      this.posts = this.posts.filter(post => post.id != id)
     this.alert.danger('Пост видалено!')


   })
  };

  ngOnDestroy() {
    if (this.inSub){
      this.inSub.unsubscribe()
    }
    if (this.remSub){
      this.remSub.unsubscribe()
    }
  }
}
