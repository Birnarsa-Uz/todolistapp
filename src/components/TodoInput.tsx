import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/store';

const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask({ text, deadline, priority }));
    setText('');
    setDeadline('');
    setPriority('MEDIUM');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Vazifa kiriting"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}>
        <option value="HIGH">Yuqori</option>
        <option value="MEDIUM">O‘rta</option>
        <option value="LOW">Past</option>
      </select>
      <button type="submit">Qo‘shish</button>
    </form>
  );
};

export default TodoInput; 