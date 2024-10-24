import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { Todo } from '../models';
import { TodosStore } from '../todos.store';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  // private service = inject(TodoService);
  todoStore = inject(TodosStore);
  @Input({ required: true }) item!: any;

  remove(todo: Todo) {
    this.todoStore.updateItems((items) =>
      items.filter((x) => x.id !== todo.id)
    );
  }

  toggleItem(todo: Todo) {
    this.todoStore.updateItems((items) =>
      items.map((x) =>
        x.id === todo.id ? { ...x, completed: !x.completed } : x
      )
    );
  }
}
