import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { FilterType, Todo } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  items$ = new BehaviorSubject<Todo[]>([]);
  filterType: FilterType = 'All';
  http = inject(HttpClient);

  public getTodosJson() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .subscribe((res) => {
        this.items$.next(res);
      });
  }

  add(value: string) {
    const current = this.items$.getValue();
    const todo: Todo = {
      id: uuidv4(),
      title: value,
      completed: false,
    };
    const nextValue = [...current, todo];
    this.items$.next(nextValue);
  }

  remove(todo: Todo) {
    const nextValue = this.items$.getValue().filter((x) => x.id !== todo.id);
    this.items$.next(nextValue);
  }

  get activeCount() {
    let activeCount;
    this.items$
      .pipe(map((items: any[]) => items.filter((x) => !x.completed).length))
      .subscribe((count) => {
        activeCount = count;
      });
    return activeCount;
  }

  filter(filtering: any) {
    this.filterType = filtering;
  }

  filterItems() {
    switch (this.filterType) {
      case 'Active':
        return this.items$.pipe(
          map((items) => items.filter((item) => !item.completed))
        );
      case 'Completed':
        return this.items$.pipe(
          map((items) => items.filter((item) => item.completed))
        );
      default:
        return this.items$;
    }
  }
}
