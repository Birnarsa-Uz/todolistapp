import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/store';

const TodoInput: React.FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yangi vazifa qo‘shing"
      />
      <button type="submit">Qo‘shish</button>
    </form>
  );
};

export default TodoInput;