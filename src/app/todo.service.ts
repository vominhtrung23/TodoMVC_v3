import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Todo } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  loadStore() {
    return this.http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );
  }
}
