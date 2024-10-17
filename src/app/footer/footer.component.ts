import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FilterType } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private service = inject(TodoService);

  vm$ = this.service.vm$;

  filter(filterItem: FilterType) {
    this.service.filter(filterItem);
  }

  clearCompleted() {
    this.service.clearCompleted();
  }
}
