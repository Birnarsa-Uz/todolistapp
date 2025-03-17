import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import SearchBar from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, RootState } from './redux/store';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Kategoriyalar</h2>
        <ul>
          <li
            className={!selectedCategory ? 'active' : ''}
            onClick={() => dispatch(setCategory(null))}
          >
            Barcha kategoriyalar
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={selectedCategory === cat.id ? 'active' : ''}
              onClick={() => dispatch(setCategory(cat.id))}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h1>Project Manager</h1>
        <TodoInput />
        <SearchBar />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
};

export default App;