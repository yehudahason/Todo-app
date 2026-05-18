export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// The type for your array would be:
export type TodoList = TodoItem[];

export type FilterType = "all" | "active" | "completed";
