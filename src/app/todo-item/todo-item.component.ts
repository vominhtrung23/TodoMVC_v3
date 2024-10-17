import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemComponent } from '../item/item.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ItemComponent],
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private service = inject(TodoService);
  vm$ = this.service.vm$;
}
