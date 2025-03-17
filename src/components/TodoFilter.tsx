import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, RootState } from '../redux/store';

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter);

  // Filtr tugmalarining ma'lumotlari
  const filters = [
    { value: 'ALL' as const, label: 'Barchasi' },
    { value: 'COMPLETED' as const, label: 'Bajarilgan' },
    { value: 'INCOMPLETE' as const, label: 'Bajarilmagan' },
  ];

  const handleFilterChange = (filter: 'ALL' | 'COMPLETED' | 'INCOMPLETE') => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="todo-filter">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={currentFilter === filter.value ? 'active' : ''}
          onClick={() => handleFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;