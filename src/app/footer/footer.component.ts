import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TodosStore } from '../todos.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  // private service = inject(TodoService);
  // vm$ = this.service.vm$;
  private todoStore = inject(TodosStore);
  vm$ = this.todoStore.vm$;

  filter(filterItems: any) {
    this.todoStore.filter(filterItems);
  }

  clearCompleted() {
    this.todoStore.updateItems((items) =>
      items.filter((item) => !item.completed)
    );
  }
}
