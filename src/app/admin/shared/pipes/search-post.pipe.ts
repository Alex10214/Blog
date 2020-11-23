import { Pipe, PipeTransform } from '@angular/core';

import {Post} from '../../../shared/interfaces';

@Pipe({
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  transform(posts: Post[], search = ''): any {
    if (!search.trim()) {
      return posts;
    }
    // tslint:disable-next-line:no-shadowed-variable
    return posts.filter( (posts) => {
      return posts.title.toLowerCase().includes(search.toLowerCase());
    });
  }

}
