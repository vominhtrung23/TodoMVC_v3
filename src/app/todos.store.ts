import { Injectable } from '@angular/core';

import { catchError, concatMap, EMPTY, Observable, tap } from 'rxjs';

import { ComponentStore } from '@ngrx/component-store';

import { FilterType, Todo, TodosState } from './models';
import { TodoService } from './todo.service';

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private TodoService: TodoService) {
    super({ items: [], filter: 'All', isLoading: false });
  }

  private readonly itemsTodo$ = this.select((state) => state.items);
  private readonly loading$ = this.select((state) => state.isLoading);
  private readonly filter$ = this.select((state) => state.filter);

  readonly vm$ = this.select(
    this.itemsTodo$,
    this.filter$,
    this.loading$,
    (items, filter, isLoading) => {
      return {
        filteredItems: filterItems(items, filter),
        filter: filter,
        activeCount: items.filter((x) => !x.completed).length,
        isLoading: isLoading,
      };
    }
  );

  readonly fetchTodos = this.effect((todoData$: Observable<void>) => {
    return todoData$.pipe(
      concatMap(() => {
        this.patchState({ isLoading: true });
        return this.TodoService.loadStore().pipe(
          tap((res: Todo[]) => {
            this.patchState({ items: res, isLoading: false });
          }),
          catchError(() => {
            // Handle errors if needed
            this.patchState({ isLoading: false });
            return EMPTY; // or return an observable with an error message
          })
        );
      })
    );
  });

  filter(filter: FilterType) {
    this.patchState({ filter: filter });
  }

  readonly updateItems = this.updater(
    (state: TodosState, modifyItem: (items: Todo[]) => Todo[]) => ({
      ...state,
      items: modifyItem(state.items), // Gọi hàm modifyItem để cập nhật items
    })
  );
}

function filterItems(items: Todo[], filter: FilterType) {
  switch (filter) {
    case 'Active':
      return items.filter((item) => !item.completed);
    case 'Completed':
      return items.filter((item) => item.completed);
    default:
      return items;
  }
}
