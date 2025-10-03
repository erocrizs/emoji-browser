import React from 'react';
import EmojiItem from './EmojiItem';
import './Main.css';

function Main({ displayedItems, selectedEmoji, onEmojiSelect, onScroll, visibleCount, totalCount }) {
  return (
    <main className="main-content">
      <div className="emoji-grid" onScroll={onScroll}>
        {displayedItems.map((emoji) => (
          <EmojiItem
            key={`${emoji.hexcode}-${emoji.order}`}
            emoji={emoji}
            isSelected={selectedEmoji?.hexcode === emoji.hexcode && selectedEmoji?.order === emoji.order}
            onSelect={onEmojiSelect}
          />
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
