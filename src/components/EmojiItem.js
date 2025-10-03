import React from 'react';
import './EmojiItem.css';

function EmojiItem({ emoji, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect(emoji);
  };

  return (
    <div
      className={`emoji-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <img 
        src={`/svg/${emoji.src}`} 
        alt={emoji.annotation}
        className="emoji-grid-image"
      />
      <div className="emoji-grid-text">{emoji.emoji}</div>
    </div>
  );
}

export default EmojiItem;
