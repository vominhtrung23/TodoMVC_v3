import { Injectable } from '@angular/core';
import { FilterType, Todo } from './models';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  items: Todo[] = [];
  filterType: FilterType = 'All';
  
  constructor() { }

  add(value: string) {
    this.items.push({
      id: uuidv4(),
      title: value,
      isComplete: false
    });
  }

  remove(todo:Todo){
    this.items = this.items.filter((x) => x.id !== todo.id);
  }

  get activeCount() {
    return this.items.filter((x) => !x.isComplete).length;
  }

  filter(filteritem: any) {
    this.filterType = filteritem;
  }

  fillterItems() {
    switch (this.filterType) {
      case 'Active':
        return this.items.filter(x => !x.isComplete)
      case 'Completed':
        return this.items.filter(x => x.isComplete)
      default:
        return this.items;
    }
  }
}
