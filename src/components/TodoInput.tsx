import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, RootState } from '../redux/store';

interface Person {
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
}
const person: Person = {
  name: 'John',
  age: 25,
  gender: 'Other'
}
const TodoInput: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const [ text, setText] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [category, setCategory] = useState<string>(categories[0]?.id || '');
  const [subtaskInputs, setSubtaskInputs] = useState<string[]>(['']);

  const addSubtaskInput = () => {
    setSubtaskInputs([...subtaskInputs, '']);
  };

  const updateSubtaskInput = (index: number, value: string) => {
    const newInputs = [...subtaskInputs];
    newInputs[index] = value;
    setSubtaskInputs(newInputs);  
  };

  const removeSubtaskInput = (index: number) => {
    setSubtaskInputs(subtaskInputs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category) return;

    const subtasks = subtaskInputs
      .filter((input) => input.trim())
      .map((text) => ({
        id: crypto.randomUUID(),
        text,
        completed: false,
      }));

    dispatch(
      addTask({
        text,
        deadline: deadline || undefined,
        priority,
        category,
        subtasks,
      })
    );

    setText('');
    setDeadline('');
    setPriority('MEDIUM');
    setCategory(categories[0]?.id || '');
    setSubtaskInputs(['']);
  };
  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yangi vazifa kiriting"
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}
        >
          <option value="HIGH">Yuqori</option>
          <option value="MEDIUM">O‘rta</option>
          <option value="LOW">Past</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="subtask-inputs">
        <h4>Ichki vazifalar:</h4>
        {subtaskInputs.map((input, index) => (
          <div key={index} className="subtask-row">
            <input
              type="text"
              value={input}
              onChange={(e) => updateSubtaskInput(index, e.target.value)}
              placeholder={`Ichki vazifa #${index + 1}`}
            />
            {subtaskInputs.length > 1 && (
              <button
                type="button"
                className="remove-subtask"
                onClick={() => removeSubtaskInput(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-subtask" onClick={addSubtaskInput}>
          + Yangi ichki vazifa
        </button>
      </div>

      <button type="submit">Qo‘shish</button>
    </form>
  );
};

export default TodoInput;