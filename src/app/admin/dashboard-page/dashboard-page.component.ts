import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  deleteSubscription: Subscription;
  searchPost = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
      /*console.log('NEW RESPONSE', posts) // data validation*/
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  deletePosts(id: any): void {
    this.deleteSubscription = this.postsService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }
}
