import React from 'react';
import ProductCard from './ProductCard';

function Step({ 
  step, 
  isOpen, 
  selectedState, 
  onToggle, 
  onSelectVariant, 
  onUpdateQuantity,
  getSelectedCount,
  onSetCurrentStep
}) {
  const selectedCount = getSelectedCount(step.id);

  const handleNext = () => {
    if (step.id < 4) {
      onSetCurrentStep(step.id + 1);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-4" style={{ borderColor: '#E5E7EB' }}>
      <button
        onClick={onToggle}
        className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs md:text-sm font-medium" style={{ color: '#6B7280' }}>
            STEP {step.id} OF 4
          </span>
          <span className="text-lg md:text-xl">{step.icon}</span>
          <h2 className="text-sm md:text-lg font-semibold" style={{ color: '#1E3A5F' }}>
            {step.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
            {selectedCount > 0 ? `${selectedCount} selected ✔` : ''}
          </span>
          <svg
            className={`w-4 h-4 md:w-5 md:h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#1E3A5F' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4" style={{ borderTop: '1px solid #E5E7EB' }}>
          <div className="space-y-4 md:space-y-6">
            {step.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                stepId={step.id}
                selectedState={selectedState?.products[product.id]}
                onSelectVariant={onSelectVariant}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="mt-4 md:mt-6 px-4 md:px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm md:text-base"
            style={{ background: '#1E3A5F' }}
          >
            Next: {step.id < 4 ? `Step ${step.id + 1}` : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Step;