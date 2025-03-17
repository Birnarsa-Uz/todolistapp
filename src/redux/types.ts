export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  subtasks: Subtask[];
}

export interface Category {
  id: string;
  name: string;
}