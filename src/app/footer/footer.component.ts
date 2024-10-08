import { Component, inject } from '@angular/core';
import { FilterType } from '../models';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private service = inject(TodoService);

  filter(filteritem: any) {
    this.service.filter(filteritem);
  }
  get activeCount() {
    return this.service.activeCount;
  }
  clearCompleted(){
    this.service.items = this.service.items.filter(x=>!x.isComplete);
  }
}
