import { Injectable } from '@angular/core';
import { FilterType, Todo } from './models';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  items: Todo[] = [];
  itemsSubject$ = new BehaviorSubject<Todo[]>([]);
  filterType: FilterType = 'All';
  private jsonUrl = 'assets/todos.json';
  constructor(private http: HttpClient) { }
  public getTodosjson() {
    this.http.get<any>("https://jsonplaceholder.typicode.com/todos?_limit=10").subscribe(res => {
      this.itemsSubject$.next(res);
    });
  }

  add(value: string) {
    const currentArray = this.itemsSubject$.getValue();
    let valueNewobject = {
      id: uuidv4(),
      title: value,
      completed: false
    };
    const updatedArray = [...currentArray, valueNewobject];
    this.itemsSubject$.next(updatedArray);
  }

  remove(todo: Todo) {
    const currentItems = this.itemsSubject$.getValue();
    const updatedItems = currentItems.filter(x => x.id !== todo.id);
    this.itemsSubject$.next(updatedItems);
  }

  get activeCount() {
    let activeCount;
    this.itemsSubject$.pipe(
      map((items: any[]) => items.filter(x => !x.completed).length)
    ).subscribe(count=> {activeCount = count});
    return activeCount;
  }

  filter(filtering: any) {
    this.filterType = filtering; 
  }

  filterItems() {
    switch (this.filterType) {
      case 'Active':
        return this.itemsSubject$.pipe(
          map(items => items.filter(item => !item.completed)) 
        );
      case 'Completed':
        return this.itemsSubject$.pipe(
          map(items => items.filter(item => item.completed)) 
        );
      default:
        return this.itemsSubject$;
    }
  }
}
