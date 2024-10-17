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
  private service = inject(TodoService);

  heading = 'Todos';
  isActive = false;
  input = new FormControl('');

  addNew() {
    let value = this.input.value;
    if (!value) {
      return;
    }
    this.service.add(value);
    this.input.setValue('');
  }

  toggleAll() {
    this.isActive = !this.isActive;
    this.service.toggleAll(this.isActive);
  }
}
