import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  heading = 'Todos';
  toggleAllItems = false;
  input = new FormControl('');
  private service = inject(TodoService);

  addnew() {
    let value = this.input.value;
    if (!value) {
      return;
    }
    this.service.add(value);
    this.input.setValue('');
  }
  toggleAll() {
    this.toggleAllItems = !this.toggleAllItems;
    const currentItems = this.service.items$.value;
    const updatedItems = currentItems.map((item: any) => {
      return { ...item, completed: this.toggleAllItems };
    });
    this.service.items$.next(updatedItems);
  }
}
