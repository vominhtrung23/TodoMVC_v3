import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  heading = 'Todos';
  toggleAllItems = false;
  input = new FormControl('');
  private service = inject(TodoService);
  addnew() {
    let value = this.input.value; 
    if (!value) {
      return
    }
    this.service.add(value);
    this.input.setValue('');
  }
  toggleAll() {
    this.toggleAllItems = !this.toggleAllItems;
    this.service.items.forEach((item: any) => {
      item.isComplete = this.toggleAllItems;
    });
  }
}
