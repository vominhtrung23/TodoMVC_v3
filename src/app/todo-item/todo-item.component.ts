import { Component, inject } from '@angular/core';
import {TodoService} from '../todo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterType, Todo } from '../models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  private service = inject(TodoService);
  constructor(){
    
  }
  get fillterItems() {
    return this.service.fillterItems();
  }

  remove(todo: Todo) {
    this.service.remove(todo);
  }
  toggleItem(todo: Todo) {
    todo.isComplete = !todo.isComplete;
  }
}
