import React from 'react';
import TodoInput from './components/TodoInput';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoInput />
    </div>
  );
};

export default App;