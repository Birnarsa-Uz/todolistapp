import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../redux/types';
import { toggleTodo, deleteTodo, RootState } from '../redux/store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'COMPLETED') return todo.completed;
    if (filter === 'INCOMPLETE') return !todo.completed;
    return true; // ALL
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <span>{todo.text}</span>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>O‘chirish</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;