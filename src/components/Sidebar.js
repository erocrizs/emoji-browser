import React from 'react';
import './Sidebar.css';

function Sidebar({ selectedEmoji, onTagClick }) {
  return (
    <aside className="sidebar">
      {selectedEmoji ? (
        <div className="emoji-details">
          <div className="emoji-preview">
            <img 
              src={`/svg/${selectedEmoji.src}`} 
              alt={selectedEmoji.annotation}
              className="emoji-image"
            />
          </div>
          
          <div className="details-section">
            <h3>Details</h3>
            <div className="detail-item">
              <strong>Annotation:</strong> {selectedEmoji.annotation}
            </div>
            <div className="detail-item">
              <strong>Hexcode:</strong> {selectedEmoji.hexcode}
            </div>
            <div className="detail-item">
              <strong>Group:</strong> {selectedEmoji.group}
            </div>
            <div className="detail-item">
              <strong>Unicode:</strong> {selectedEmoji.unicode}
            </div>
            <div className="detail-item">
              <strong>Order:</strong> {selectedEmoji.order}
            </div>
            {selectedEmoji.skintone && (
              <div className="detail-item">
                <strong>Skintone:</strong> {selectedEmoji.skintone}
              </div>
            )}
          </div>

          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags-container">
              {selectedEmoji.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="tag clickable-tag"
                  onClick={() => onTagClick(tag)}
                  title={`Filter by "${tag}"`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {selectedEmoji.skintone_variants && selectedEmoji.skintone_variants.length > 0 && (
            <div className="variants-section">
              <h3>Skin Tone Variants</h3>
              <div className="variants-container">
                {selectedEmoji.skintone_variants.map((variant, index) => (
                  <div key={index} className="variant-item">
                    <img 
                      src={`/svg/${variant.src}`} 
                      alt={variant.annotation}
                      className="variant-image"
                    />
                    <span className="variant-text">{variant.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-selection">
          <p>Select an emoji to view details</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
