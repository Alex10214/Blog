import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fireBaseDataBaseUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        //console.log('RESPONSE',response)
        const newPost: Post = {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
        //console.log('NEWPOST',newPost)
        return newPost
      }))
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.fireBaseDataBaseUrl}/posts.json`)
      .pipe(map((response: any) => {
          //console.log('RESPONSE', response) // firebase возвращает что-то прям кривой обьект..
          //console.log('RESPONSE', Object.keys(response)) // выдиляю ключи
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        })
      )
  }
  deletePost(id): Observable<any> {
    return this.http.delete(`${environment.fireBaseDataBaseUrl}/posts/${id}.json`)
  }

  getPostById (id): Observable<any> {
    return this.http.get(`${environment.fireBaseDataBaseUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        const newPost: Post = {
          ...post,
          id,
          date: new Date(post.date)
        }
        return newPost
      }))
  }

  updatePost(post: Post): Observable<any> {
    return this.http.patch(`${environment.fireBaseDataBaseUrl}/posts/${post.id}.json`, post)
  }
}


