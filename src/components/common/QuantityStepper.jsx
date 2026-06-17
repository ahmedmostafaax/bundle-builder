import React from 'react';

function QuantityStepper({ quantity, onQuantityChange }) {
  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <button
        onClick={handleDecrement}
        disabled={quantity === 0}
        className={`
          w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center text-xs md:text-sm
          ${quantity === 0 
            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
            : 'border-gray-300 hover:bg-gray-100'
          }
        `}
      >
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">{quantity}</span>
      
      <button
        onClick={handleIncrement}
        className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs md:text-sm"
      >
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityStepper;