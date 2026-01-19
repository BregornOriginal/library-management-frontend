import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchBy);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchBy('');
    onSearch('', '');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="search-select"
        >
          <option value="">All Fields</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
      </div>

      <div className="search-buttons">
        <button type="submit" className="btn btn-search">
          🔍 Search
        </button>
        {(searchTerm || searchBy) && (
          <button type="button" className="btn btn-clear" onClick={handleClear}>
            ✖ Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
