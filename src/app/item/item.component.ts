import { Component, inject, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input({ required: true }) item!: any;
  private service = inject(TodoService);
  remove(todo: Todo) {
    this.service.remove(todo);
  }
  toggleItem(todo: Todo) {
    todo.completed = !todo.completed;
  }
}
