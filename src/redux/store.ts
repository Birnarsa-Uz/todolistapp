import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Category } from './types'; // 'Subtask' ni olib tashladik

interface ProjectState {
  tasks: Task[];
  categories: Category[];
  filter: 'ALL' | 'COMPLETED' | 'INCOMPLETE';
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: ProjectState = {
  tasks: [],
  categories: [
    { id: '1', name: 'Ish' },
    { id: '2', name: 'Shaxsiy' },
    { id: '3', name: 'Ta’lim' },
  ],
  filter: 'ALL',
  searchQuery: '',
  selectedCategory: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed'>>) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        completed: false,
        ...action.payload,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    addSubtask: (state, action: PayloadAction<{ taskId: string; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.subtasks.push({
          id: crypto.randomUUID(),
          text: action.payload.text,
          completed: false,
        });
      }
    },
    toggleSubtask: (state, action: PayloadAction<{ taskId: string; subtaskId: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        const subtask = task.subtasks.find((s) => s.id === action.payload.subtaskId);
        if (subtask) subtask.completed = !subtask.completed;
      }
    },
    setFilter: (state, action: PayloadAction<ProjectState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  addSubtask,
  toggleSubtask,
  setFilter,
  setSearchQuery,
  setCategory,
  loadTasks,
} = projectSlice.actions;

export const store = configureStore({
  reducer: projectSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;