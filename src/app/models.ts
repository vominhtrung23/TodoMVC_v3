export interface Todo{
    id: string;
    title: string;
    isComplete: Boolean
}

export type FilterType = 'All' | 'Active' | 'Completed';