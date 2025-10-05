import React from 'react';
import './Header.css';

function Header({ filterTag, setFilterTag, filterGroup, setFilterGroup, handleFilter, handleGroupChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Emoji Browser</h1>
        <div className="filter-section">
          <input
            type="text"
            placeholder="Filter by tag or annotation..."
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="filter-input"
          />
          <button onClick={handleFilter} className="filter-button">
            Filter
          </button>
        </div>
        <div className="group-filter-section">
          <select
            value={filterGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            className="group-select"
          >
            <option value="">All Groups</option>
            <option value="activities">Activities</option>
            <option value="animals-nature">Animals & Nature</option>
            <option value="component">Component</option>
            <option value="flags">Flags</option>
            <option value="food-drink">Food & Drink</option>
            <option value="objects">Objects</option>
            <option value="people-body">People & Body</option>
            <option value="smileys-emotion">Smileys & Emotion</option>
            <option value="symbols">Symbols</option>
            <option value="travel-places">Travel & Places</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
