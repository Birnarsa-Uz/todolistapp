import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, RootState } from '../redux/store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.searchQuery);

  // Lokal input qiymati Redux bilan sinxronlash uchun
  const [inputValue, setInputValue] = useState<string>(searchQuery);

  // Input o‘zgarganda Redux state’ni yangilash
  const handleSearch = (value: string) => {
    setInputValue(value);
    dispatch(setSearchQuery(value));
  };

  // Redux state o‘zgarsa inputni sinxronlash
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Qidiruvni tozalash
  const clearSearch = () => {
    setInputValue('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Vazifalarni qidiring..."
      />
      {inputValue && (
        <button className="clear-btn" onClick={clearSearch}>
          X
        </button>
      )}
    </div>
  );
};

export default SearchBar;