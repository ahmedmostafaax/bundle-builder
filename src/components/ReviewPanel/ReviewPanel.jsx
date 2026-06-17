import React from 'react';
import ReviewItem from './ReviewItem';

function ReviewPanel({ items, totals, onUpdateQuantity, onSave, onCheckout }) {
  const groupItems = (items) => {
    const groups = {};
    const categoryMap = {
      1: 'CONSULTATION',
      2: 'SOLUTION',
      3: 'ACCESSORIES',
      4: 'MORE INFO'
    };
    
    items.forEach(item => {
      const category = categoryMap[item.stepId] || 'OTHER';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    
    return groups;
  };

  const groupedItems = groupItems(items);

  return (
    <div 
      className="p-4 md:p-6 rounded-xl max-w-md mx-auto"
      style={{ background: '#EDF4FF' }}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#1E3A5F' }}>
        Security System
      </h2>
      
      <p className="text-xs md:text-sm mb-4 md:mb-6" style={{ color: '#6B7280' }}>
        Resolve your personalization protection system developed to ensure robust security.
      </p>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">
          No items selected yet.
        </p>
      ) : (
        <>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm font-semibold tracking-wider mb-2 md:mb-3" style={{ color: '#1E3A5F' }}>
                {category}
              </h3>
              <div className="space-y-1 md:space-y-2">
                {categoryItems.map((item) => (
                  <ReviewItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(newQuantity) => 
                      onUpdateQuantity(item.stepId, item.productId, item.variantId, newQuantity)
                    }
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 md:mt-8 pt-3 md:pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
            <button 
              onClick={onCheckout}
              className="w-full mt-3 md:mt-4 py-2.5 md:py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-colors text-sm md:text-base"
              style={{ background: '#1E3A5F' }}
            >
              Checkout
            </button>

            <button 
              onClick={onSave}
              className="w-full text-center text-xs md:text-sm hover:underline mt-2"
              style={{ color: '#1E3A5F' }}
            >
              Save my system for later
            </button>

            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #E5E7EB' }}>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                Contact Us
              </p>
              <p className="text-xs font-semibold" style={{ color: '#1E3A5F' }}>
                833.88.88.88
              </p>
              <p className="text-lg font-bold mt-1" style={{ color: '#1E3A5F' }}>
                ${totals.total.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewPanel;