import React, { useState, useRef } from 'react';
import './Sidebar.css';

function Sidebar({ selectedEmoji, onTagClick }) {
  const [imageSize, setImageSize] = useState(80);
  const imageRef = useRef(null);
  const sidebarRef = useRef(null);

  // Calculate sidebar width based on image size
  const calculateSidebarWidth = () => {
    const baseWidth = 350; // Base sidebar width
    const padding = 60; // Total horizontal padding (1.5rem * 2 + some margin)
    const requiredWidth = imageSize + padding;
    return Math.max(baseWidth, requiredWidth);
  };

  const handleDownload = () => {
    if (imageRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = imageSize;
      canvas.height = imageSize;
      
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, imageSize, imageSize);
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedEmoji.annotation.replace(/\s+/g, '_')}_${imageSize}x${imageSize}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      };
      img.src = `/svg/${selectedEmoji.src}`;
    }
  };

  return (
    <aside 
      ref={sidebarRef}
      className="sidebar"
      style={{ width: `${calculateSidebarWidth()}px` }}
    >
      {selectedEmoji ? (
        <div className="emoji-details">
          <div className="emoji-preview">
            <img 
              ref={imageRef}
              src={`/svg/${selectedEmoji.src}`} 
              alt={selectedEmoji.annotation}
              className="emoji-image"
              style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
            />
            
            <div className="image-controls">
              <div className="controls-row">
                <div className="input-group">
                  <label>Size:</label>
                  <input
                    type="number"
                    value={imageSize}
                    onChange={(e) => setImageSize(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                    max="512"
                  />
                </div>
                <button 
                  className="download-button"
                  onClick={handleDownload}
                  title={`Download ${imageSize}x${imageSize} PNG`}
                >
                  Download PNG
                </button>
              </div>
            </div>
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
