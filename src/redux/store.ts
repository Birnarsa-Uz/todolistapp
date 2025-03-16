import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';

interface TaskState {
  tasks: Task[];
  filter: 'ALL' | 'COMPLETED' | 'INCOMPLETE';
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'ALL',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'completed'>>) => {
      const newTask: Task = {
        id: crypto.randomUUID(), // uuid o‘rniga
        completed: false,
        ...action.payload,
      };
      state.tasks.push(newTask);
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
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter, setSearchQuery, loadTasks } = taskSlice.actions;

export const store = configureStore({
  reducer: taskSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;