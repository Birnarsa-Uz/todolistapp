import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Task, Todo } from '../redux/types';
import { toggleTask, deleteTask } from '../redux/store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos) as Task[];
  const filter = useSelector((state: any) => state.filter) as string;

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
            onChange={() => dispatch(toggleTask(todo.id))}
          />
          <span>{todo.text}</span>
          <button onClick={() => dispatch(deleteTask(todo.id))}>O‘chirish</button>
        </li>
      ))}
      <var></var>
    </ul>
  );
};

export default TodoList;