import { Component, inject } from '@angular/core';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private service = inject(TodoService);

  filter(filteritem: any) {
    this.service.filter(filteritem);
  }
  get activeCount() {
    return this.service.activeCount;
  }
  clearCompleted() {
    const currentItems = this.service.items$.getValue();
    const updatedItems = currentItems.filter((x) => !x.completed);
    this.service.items$.next(updatedItems);
  }
}
