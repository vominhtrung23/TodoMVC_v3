import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { Todo } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  private service = inject(TodoService);

  @Input({ required: true }) item!: any;

  remove(todo: Todo) {
    this.service.remove(todo);
  }

  toggleItem(todo: Todo) {
    this.service.update(todo);
  }
}
