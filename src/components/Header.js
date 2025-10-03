import React from 'react';
import './Header.css';

function Header({ filterTag, setFilterTag, handleFilter }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Emoji Browser</h1>
        <div className="filter-section">
          <input
            type="text"
            placeholder="Filter by tag..."
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="filter-input"
          />
          <button onClick={handleFilter} className="filter-button">
            Filter
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
