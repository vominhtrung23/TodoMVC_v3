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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HeaderComponent, TodoItemComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  heading = 'Todos';
  input = new FormControl('');
  items: Todo[] = [];

 
  private service = inject(TodoService);
  constructor(){
    this.items = this.service.items;
  }

 
  // addnew() {
  //   let value = this.input.value;
  //   console.log("dd", !value, value?.trim.length);
  //   if (!value) {
  //     return
  //   }
  //   this.items.push({
  //     id: uuidv4(),
  //     title: value,
  //     isComplete: false
  //   });
  //   this.input.setValue('');
  //   console.log("items", this.items);
  // }
  // toggleAll() {
  //   this.toggleAllItems = !this.toggleAllItems;
  //   this.items.forEach((item: any) => {
  //     item.isComplete = this.toggleAllItems;
  //   });
  // }
  // remove(todo: Todo) {
  //   this.items = this.items.filter((x) => x.id !== todo.id);
  // }
  // toggleItem(todo: Todo) {
  //   todo.isComplete = !todo.isComplete;
  //   console.log("todo", todo);
  // }
  // filter(filteritem: any) {
  //   this.filterType = filteritem;
  //   console.log("this.filterType", this.filterType);
  // }
}
