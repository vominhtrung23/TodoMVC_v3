export interface Todo {
  id: string;
  title: string;
  completed: Boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';

export interface TodosState {
  items: Todo[];
  filter: FilterType;
  isLoading: Boolean;
}
