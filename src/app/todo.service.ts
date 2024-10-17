import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, delay, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { FilterType, Todo } from './models';

// type State = {
//   items: Todo[];
//   filter: FilterType;
// };

// const initialState = { items: [] as Todo[], filter: 'All' as FilterType };
// type State = typeof initialState;

type State = {
  items: Todo[];
  filter: FilterType;
  isLoading: boolean;
};

const initialState: State = { items: [], filter: 'All', isLoading: false };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private state$ = new BehaviorSubject<State>(initialState);
  private http = inject(HttpClient);

  vm$ = this.state$.pipe(
    map((state) => {
      return {
        filteredItems: getFilterItems(state),
        activeCount: state.items.filter((x) => !x.completed).length,
        filter: state.filter,
        isLoading: state.isLoading,
      };
    })
  );

  private patchState(newState: Partial<State>) {
    this.state$.next({ ...this.state$.value, ...newState });
  }

  load() {
    this.patchState({ isLoading: true });
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(delay(3000))
      .subscribe((res) => {
        this.patchState({ items: res, isLoading: false });
      });
  }

  add(value: string) {
    const todo: Todo = {
      id: uuidv4(),
      title: value,
      completed: false,
    };
    const newItems = [...this.state$.value.items, todo];
    this.patchState({ items: newItems });
  }

  remove(todo: Todo) {
    const newItems = this.state$.value.items.filter((x) => x.id !== todo.id);
    this.patchState({ items: newItems });
  }

  update(todo: Todo) {
    const newItems = this.state$.value.items.map((x) =>
      x.id === todo.id ? { ...x, completed: !x.completed } : x
    );
    this.patchState({ items: newItems });
  }

  toggleAll(isActive: boolean) {
    const newItems = this.state$.value.items.map((item: Todo) => ({
      ...item,
      completed: isActive,
    }));
    this.patchState({ items: newItems });
  }

  filter(filtering: FilterType) {
    this.patchState({ filter: filtering });
  }

  clearCompleted() {
    const newItems = this.state$.value.items.filter((x) => !x.completed);
    this.patchState({ items: newItems });
  }
}

// computed
function getFilterItems({ items, filter }: State) {
  switch (filter) {
    case 'Active':
      return items.filter((item) => !item.completed);
    case 'Completed':
      return items.filter((item) => item.completed);
    default:
      return items;
  }
}
