import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosStore } from './todos.store';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  constructor(private todoStore: TodosStore) {}
  ngOnInit(): void {
    this.todoStore.fetchTodos();
  }
}
