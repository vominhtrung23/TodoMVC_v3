import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { TodoService } from '../app/todo.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Todo } from './models';
import { TodoItemComponent } from './todo-item/todo-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    TodoItemComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  heading = 'Todos';
  input = new FormControl('');
  items = new BehaviorSubject<Todo[]>([]);

  private service = inject(TodoService);
  constructor() {
    this.items = this.service.items$;
    this.service.getTodosJson();
  }
}
