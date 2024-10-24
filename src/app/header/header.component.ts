import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { TodosStore } from '../todos.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // private service = inject(TodoService);
  private TodosStore = inject(TodosStore);
  heading = 'Todos';
  isActive = false;
  input = new FormControl('');

  addNew() {
    let value = this.input.value;
    if (!value) {
      return;
    }
    let newItems = {
      id: uuidv4(),
      title: value,
      completed: false,
    };
    this.TodosStore.updateItems((items) => [...items, newItems]);
    this.input.setValue('');
  }

  toggleAll() {
    this.TodosStore.updateItems((items) => {
      const hasIncomplete = items.some((item) => !item.completed);
      this.isActive = hasIncomplete;

      const updatedItems = items.map((item) => ({
        ...item,
        completed: this.isActive,
      }));
      return updatedItems;
    });
  }
}
