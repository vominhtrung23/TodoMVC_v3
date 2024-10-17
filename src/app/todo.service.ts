import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { FilterType, Todo } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private items$ = new BehaviorSubject<Todo[]>([]);
  private filterType$ = new BehaviorSubject<FilterType>('All');
  private http = inject(HttpClient);

  vm$ = combineLatest([this.items$, this.filterType$]).pipe(
    map(([items, filter]) => {
      return {
        filteredItems: getFilterItems(items, filter),
        filter,
        activeCount: items.filter((x) => !x.completed).length,
      };
    })
  );

  load() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
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

  update(todo: Todo) {
    const nextValue = this.items$
      .getValue()
      .map((x) => (x.id === todo.id ? { ...x, completed: !x.completed } : x));
    this.items$.next(nextValue);
  }

  toggleAll(isActive: boolean) {
    const nextValue = this.items$
      .getValue()
      .map((item: Todo) => ({ ...item, completed: isActive }));
    this.items$.next(nextValue);
  }

  filter(filtering: FilterType) {
    this.filterType$.next(filtering);
  }

  clearCompleted() {
    const nextValue = this.items$.getValue().filter((x) => !x.completed);
    this.items$.next(nextValue);
  }
}

// computed
function getFilterItems(items: Todo[], filter: FilterType) {
  switch (filter) {
    case 'Active':
      return items.filter((item) => !item.completed);
    case 'Completed':
      return items.filter((item) => item.completed);
    default:
      return items;
  }
}
