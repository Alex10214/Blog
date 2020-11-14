import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../../../shared/interfaces";

@Pipe({
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  transform(posts: Post[], search = '') {
    if (!search.trim()) {
      return posts
    }
    return posts.filter(posts => {
      return posts.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
