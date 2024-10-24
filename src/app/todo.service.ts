import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Todo } from './models';

// type State = {
//   items: Todo[];
//   filter: FilterType;
//   isLoading: boolean;
// };

// const initialState: State = { items: [], filter: 'All', isLoading: false };
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private state$ = new BehaviorSubject<State>(initialState);
  // private items$ = new BehaviorSubject<Todo[]>([]);
  // filterType$ = new BehaviorSubject<FilterType>('All');
  private http = inject(HttpClient);
  // vm$ = combineLatest(this.items$, this.filterType$).pipe(
  //   map(([items, filter]) => {
  //     return {
  //       filteredItems: filterItems(items, filter),
  //       filter,
  //       activeCount: items.filter((x) => !x.completed).length,
  //     };
  //   })
  // );

  // vm$ = this.state$.pipe(
  //   map((state) => {
  //     return {
  //       filteredItems: filterItems(state),
  //       filter: state.filter,
  //       activeCount: state.items.filter((x) => !x.completed).length,
  //       isLoading: state.isLoading,
  //     };
  //   })
  // );
  // private patchState(newState: Partial<State>) {
  //   this.state$.next({ ...this.state$.value, ...newState });
  // }
  loadStore() {
    return this.http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );
  }
  // load() {
  //   this.patchState({ isLoading: true });
  //   this.http
  //     .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //     .pipe(delay(3000))
  //     .subscribe((res) => {
  //       // this.items$.next(res);
  //       // this.state$.next({ ...this.state$.value, items: res });
  //       this.patchState({ items: res, isLoading: false });
  //     });
  // }

  // add(value: string) {
  //   const currentArray = this.items$.getValue();
  //   let newItems = {
  //     id: uuidv4(),
  //     title: value,
  //     completed: false,
  //   };
  //   const updatedItems = [...currentArray, newItems];
  //   // this.items$.next(updatedArray);
  //   // this.state$.next({ ...this.state$.value, items: updatedItems });
  //   this.patchState({ items: updatedItems, isLoading: false });
  // }

  // update(todo: Todo) {
  //   const nextValue = this.state$.value.items.map((x) =>
  //     x.id === todo.id ? { ...x, completed: !x.completed } : x
  //   );
  //   // this.items$.next(nextValue);
  //   // this.state$.next({ ...this.state$.value, items: nextValue });
  //   this.patchState({ items: nextValue });
  // }

  // remove(todo: Todo) {
  //   const removeItems = this.state$.value.items.filter((x) => x.id !== todo.id);
  //   // this.items$.next(removeItems);
  //   // this.state$.next({ ...this.state$.value, items: removeItems });
  //   this.patchState({ items: removeItems });
  // }

  // filter(filter: FilterType) {
  //   // this.filterType$.next(filter);
  //   // this.state$.next({ ...this.state$.value, filter: filter });
  //   this.patchState({ filter: filter });
  // }

  // toggleAll(isActive: boolean) {
  //   const activeLength = this.state$.value.items.filter(
  //     (x) => x.completed
  //   ).length;
  //   isActive =
  //     this.state$.value.items.length !== activeLength && !isActive
  //       ? true
  //       : false;

  //   const updatedItems = this.state$.value.items.map((item: any) => {
  //     return { ...item, completed: isActive };
  //   });
  //   // this.items$.next(updatedItems);
  //   // this.state$.next({ ...this.state$.value, items: updatedItems });
  //   this.patchState({ items: updatedItems });
  // }

  // clearCompleted() {
  //   const updatedItems = this.state$.value.items.filter((x) => !x.completed);
  //   // this.items$.next(updatedItems);
  //   // this.state$.next({ ...this.state$.value, items: updatedItems });
  //   this.patchState({ items: updatedItems });
  // }
}

// function filterItems({ items, filter }: State) {
//   switch (filter) {
//     case 'Active':
//       return items.filter((item) => !item.completed);
//     case 'Completed':
//       return items.filter((item) => item.completed);
//     default:
//       return items;
//   }
// }
// function filterItems(items: Todo[], filter: FilterType) {
//   switch (filter) {
//     case 'Active':
//       return items.filter((item) => !item.completed);
//     case 'Completed':
//       return items.filter((item) => item.completed);
//     default:
//       return items;
//   }
// }
