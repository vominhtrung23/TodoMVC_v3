import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FilterType } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private service = inject(TodoService);

  filter(filterItem: FilterType) {
    this.service.filter(filterItem);
  }

  get activeCount() {
    return this.service.activeCount;
  }

  clearCompleted() {
    this.service.clearCompleted();
  }
}
