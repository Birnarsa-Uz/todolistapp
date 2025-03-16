import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoInput />
      <TodoFilter />
      <TodoList />
    </div>
  );
};

export default App;