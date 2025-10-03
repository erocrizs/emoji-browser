import React, { useState, useEffect, useCallback } from 'react';
import data from './data.json';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import './App.css';

function App() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);

  // Initialize with first emoji selected and data sorted by order
  useEffect(() => {
    const sortedData = [...data].sort((a, b) => a.order - b.order);
    setFilteredData(sortedData);
    setDisplayedItems(sortedData.slice(0, 50));
    if (sortedData.length > 0) {
      setSelectedEmoji(sortedData[0]);
    }
  }, []);

  // Filter data by tag
  const handleFilter = useCallback(() => {
    if (!filterTag.trim()) {
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setFilteredData(sortedData);
      setDisplayedItems(sortedData.slice(0, 50));
      setVisibleCount(50);
      if (sortedData.length > 0) {
        setSelectedEmoji(sortedData[0]);
      }
    } else {
      const filtered = data.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
      ).sort((a, b) => a.order - b.order);
      
      setFilteredData(filtered);
      setDisplayedItems(filtered.slice(0, 50));
      setVisibleCount(50);
      if (filtered.length > 0) {
        setSelectedEmoji(filtered[0]);
      }
    }
  }, [filterTag]);

  // Load more items when scrolling to bottom
  const loadMoreItems = useCallback(() => {
    const nextCount = Math.min(visibleCount + 20, filteredData.length);
    setDisplayedItems(filteredData.slice(0, nextCount));
    setVisibleCount(nextCount);
  }, [visibleCount, filteredData]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreItems();
    }
  }, [loadMoreItems]);

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <div className="app">
      <Header 
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        handleFilter={handleFilter}
      />

      <div className="main-container">
        <Sidebar selectedEmoji={selectedEmoji} />
        
        <Main 
          displayedItems={displayedItems}
          selectedEmoji={selectedEmoji}
          onEmojiSelect={handleEmojiSelect}
          onScroll={handleScroll}
          visibleCount={visibleCount}
          totalCount={filteredData.length}
        />
      </div>
    </div>
  );
}

export default App;
