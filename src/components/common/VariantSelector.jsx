import React from 'react';

function VariantSelector({ variants, selectedVariant, onSelect }) {
  return (
    <div className="flex gap-1 md:gap-2 flex-wrap">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant.id)}
          className={`
            px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm flex items-center gap-1 md:gap-2 border transition-all
            ${selectedVariant === variant.id 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <span 
            className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: variant.color }}
          />
          <span className="text-xs md:text-sm">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}

export default VariantSelector;