export interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface Task {
  id: string; // uuid ishlatamiz
  text: string;
  completed: boolean;
  deadline?: string; // ISO formatida, masalan "2025-03-20T14:30"
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}