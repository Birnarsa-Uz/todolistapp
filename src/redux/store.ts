import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';

// State turi
interface TodoState {
  todos: Todo[];
  filter: 'ALL' | 'COMPLETED' | 'INCOMPLETE';
}

// Boshlang‘ich state
const initialState: TodoState = {
  todos: [],
  filter: 'ALL',
};

// Slice yaratish
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
        const newTodo: Todo = {
            id: Date.now(),
            text: action.payload,
            completed: false,
        };
        console.log(newTodo);
        state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload;
    },
  },
});

// Action creatorlarni eksport qilish
export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;

// Store
export const store = configureStore({
  reducer: todoSlice.reducer,
});

// TypeScript uchun store va dispatch tiplari
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;