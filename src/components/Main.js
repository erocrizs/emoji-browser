import React from 'react';
import EmojiItem from './EmojiItem';
import './Main.css';

function Main({ displayedItems, selectedEmoji, onEmojiSelect, onScroll, visibleCount, totalCount }) {
  // Group items by their group property
  const groupedItems = displayedItems.reduce((groups, emoji) => {
    const group = emoji.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(emoji);
    return groups;
  }, {});

  // Convert group names to readable format
  const formatGroupName = (groupName) => {
    return groupName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <main className="main-content">
      <div className="emoji-container" onScroll={onScroll}>
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <div key={groupName} className="group-section">
            <div className="group-header">
              <h2>{formatGroupName(groupName)}</h2>
              <span className="group-count">({items.length})</span>
            </div>
            <div className="emoji-grid">
              {items.map((emoji) => (
                <EmojiItem
                  key={`${emoji.hexcode}-${emoji.order}`}
                  emoji={emoji}
                  isSelected={selectedEmoji?.hexcode === emoji.hexcode && selectedEmoji?.order === emoji.order}
                  onSelect={onEmojiSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {visibleCount < totalCount && (
        <div className="loading-indicator">
          <p>Scroll down to load more emojis...</p>
        </div>
      )}
    </main>
  );
}

export default Main;
