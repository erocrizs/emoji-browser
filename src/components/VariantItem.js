import React from 'react';
import './VariantItem.css';

function VariantItem({ variant, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect(variant);
  };

  return (
    <div 
      className={`variant-option ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      title={variant.annotation}
    >
      <img 
        src={`/svg/${variant.src}`} 
        alt={variant.annotation}
        className="variant-thumbnail"
      />
    </div>
  );
}

export default VariantItem;
