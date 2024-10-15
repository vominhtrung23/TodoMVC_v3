import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FilterType, Todo } from './models';
import { v4 as uuidv4 } from 'uuid';
import { HeaderComponent } from "./header/header.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { FooterComponent } from "./footer/footer.component";
import {TodoService} from "../app/todo.service"
import { HttpClient } from '@angular/common/http'; // Nhập HttpClient để sử dụng
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HeaderComponent, TodoItemComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  heading = 'Todos';
  input = new FormControl('');
  items = new BehaviorSubject<Todo[]>([]);

  private service = inject(TodoService);
  constructor() { 
    this.items = this.service.itemsSubject$;
    this.service.getTodosjson();
  }
 
}
