import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, RootState } from '../redux/store';

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter);

  return (
    <div className="todo-filter">
      <button
        className={currentFilter === 'ALL' ? 'active' : ''}
        onClick={() => dispatch(setFilter('ALL'))}
      >
        Barchasi
      </button>
      <button
        className={currentFilter === 'COMPLETED' ? 'active' : ''}
        onClick={() => dispatch(setFilter('COMPLETED'))}
      >
        Bajarilgan
      </button>
      <button
        className={currentFilter === 'INCOMPLETE' ? 'active' : ''}
        onClick={() => dispatch(setFilter('INCOMPLETE'))}
      >
        Bajarilmagan
      </button>
    </div>
  );
};

export default TodoFilter;