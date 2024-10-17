import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemComponent } from '../item/item.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ItemComponent],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  private service = inject(TodoService);

  get filterItems() {
    return this.service.filterItems();
  }
}
