import React from 'react';
import QuantityStepper from '../common/QuantityStepper';

function ReviewItem({ item, onUpdateQuantity }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-1 md:gap-2 flex-wrap">
        <span className="text-xs md:text-sm font-medium" style={{ color: '#1E3A5F' }}>
          {item.name}
        </span>
        {item.variantLabel && (
          <span className="text-[10px] md:text-xs" style={{ color: '#9CA3AF' }}>
            ({item.variantLabel})
          </span>
        )}
        <span className="text-[10px] md:text-xs" style={{ color: '#9CA3AF' }}>
          × {item.quantity}
        </span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs md:text-sm font-semibold" style={{ color: '#1E3A5F' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <QuantityStepper
          quantity={item.quantity}
          onQuantityChange={onUpdateQuantity}
        />
      </div>
    </div>
  );
}

export default ReviewItem;