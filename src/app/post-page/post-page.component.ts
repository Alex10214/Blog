import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Post} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  newPost: Post

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
              ) { }

  ngOnInit() {
     this.route.params.subscribe((params) =>{
      return this.postService.getPostById(params['id']).subscribe((post) => {
        this.newPost = post
      })
    })

  }

}
