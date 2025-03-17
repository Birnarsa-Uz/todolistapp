import React, { useState, useEffect } from 'react';
import { Subtask } from '../redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '../redux/types';
import {
  toggleTask,
  deleteTask,
  editTask,
  addSubtask,
  toggleSubtask,
  RootState,
  loadTasks,
} from '../redux/store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const filter = useSelector((state: RootState) => state.filter);
  const searchQuery = useSelector((state: RootState) => state.searchQuery);
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [subtaskText, setSubtaskText] = useState<string>('');
  useEffect(() => {
    const checkDeadlines = setInterval(() => {
      tasks.forEach((task) => {
        if (task.deadline && !task.completed) {
          const timeLeft = new Date(task.deadline).getTime() - Date.now();
          if (timeLeft <= 3600000 && timeLeft > 0) { // 1 soat qolganda
            if (Notification.permission === 'granted') {
              new Notification(`"${task.text}" vazifasi tez orada tugaydi!`);
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission();
            }
          }
        }
      });
    }, 60000); // Har daqiqada tekshiradi
  
    return () => clearInterval(checkDeadlines);
  }, [tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) dispatch(loadTasks(JSON.parse(savedTasks)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = React.useMemo(() => {
    return tasks
      .filter((task) => (selectedCategory ? task.category === selectedCategory : true))
      .filter((task) => {
        if (filter === 'COMPLETED') return task.completed;
        if (filter === 'INCOMPLETE') return !task.completed;
        return true;
      })
      .filter((task) => task.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, filter, searchQuery, selectedCategory]);

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (task: Task) => {
    if (editText.trim()) dispatch(editTask({ ...task, text: editText }));
    setEditingId(null);
  };

  const handleSubtaskAdd = (taskId: string) => {
    if (subtaskText.trim()) {
      dispatch(addSubtask({ taskId, text: subtaskText }));
      setSubtaskText('');
    }
  };

  const isOverdue = (deadline?: string) => deadline && new Date(deadline) < new Date();

  const getProgress = (subtasks: Subtask[]) => {
    if (!subtasks.length) return 0;
    const completed = subtasks.filter((s) => s.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    dispatch(loadTasks(reorderedTasks)); // Temporary, real app would update order in state
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${task.completed ? 'completed' : ''} ${
                      task.priority.toLowerCase()
                    } ${isOverdue(task.deadline) && !task.completed ? 'overdue' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch(toggleTask(task.id))}
                    />
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(task)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(task)}
                        autoFocus
                      />
                    ) : (
                      <div>
                        <span onDoubleClick={() => startEditing(task)}>
                          {task.text} ({task.category})
                          {task.deadline && (
                            <small>
                              {' '}
                              Muddat: {new Date(task.deadline).toLocaleString()}
                            </small>
                          )}
                        </span>
                        <div className="progress-bar">
                          Progress: {getProgress(task.subtasks)}%
                          <div
                            style={{
                              width: `${getProgress(task.subtasks)}%`,
                              height: '5px',
                              backgroundColor: '#4caf50',
                            }}
                          />
                        </div>
                        <ul className="subtasks">
                          {task.subtasks.map((subtask) => (
                            <li key={subtask.id}>
                              <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() =>
                                  dispatch(toggleSubtask({ taskId: task.id, subtaskId: subtask.id }))
                                }
                              />
                              <span>{subtask.text}</span>
                            </li>
                          ))}
                        </ul>
                        <input
                          type="text"
                          value={subtaskText}
                          onChange={(e) => setSubtaskText(e.target.value)}
                          placeholder="Yangi subtask"
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleSubtaskAdd(task.id)
                          }
                        />
                      </div>
                    )}
                    <div>
                      <button className="edit" onClick={() => startEditing(task)}>
                        Tahrirlash
                      </button>
                      <button
                        className="delete"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        O‘chirish
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;