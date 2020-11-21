import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  post: Post

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //console.log('PARAMS', this.route.params) // checking what comes
      //console.log('PARAMS', params) // check ID
      //console.log('PARAMS id', params['id']) output ID
      return this.postService.getPostById(params['id']).subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, [Validators.required]),
          text: new FormControl(post.text, [Validators.required]),
        })
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.postService.updatePost({
      ...this.post,
      id: this.post.id,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
