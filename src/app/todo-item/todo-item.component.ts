import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemComponent } from '../item/item.component';
import { TodosStore } from '../todos.store';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ItemComponent],
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  todoStore = inject(TodosStore);
  vm$ = this.todoStore.vm$;
}
