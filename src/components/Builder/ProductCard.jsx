import React from 'react';
import VariantSelector from '../common/VariantSelector';
import QuantityStepper from '../common/QuantityStepper';

function ProductCard({ 
  product, 
  stepId, 
  selectedState, 
  onSelectVariant, 
  onUpdateQuantity 
}) {
  const getVariantId = () => {
    if (product.variants.length > 0) {
      return selectedState?.selectedVariant || product.variants[0].id;
    }
    return 'default';
  };

  const selectedVariantId = getVariantId();
  const currentQuantity = selectedState?.variants?.[selectedVariantId]?.quantity || 0;
  const isSelected = currentQuantity > 0;

  const handleQuantityChange = (newQuantity) => {
    onUpdateQuantity(stepId, product.id, selectedVariantId, newQuantity);
  };

  return (
    <div className={`
      border-2 rounded-lg p-3 md:p-4 transition-all
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
    `}>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <span className="text-4xl">{product.icon || '📦'}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm md:text-lg truncate" style={{ color: '#1E3A5F' }}>
                {product.name}
              </h3>
              <p className="text-xs md:text-sm mt-1 line-clamp-2" style={{ color: '#6B7280' }}>
                {product.description}
              </p>
            </div>
            {product.badge && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] md:text-xs font-medium rounded whitespace-nowrap">
                {product.badge}
              </span>
            )}
          </div>

          <a href="#" className="text-xs md:text-sm hover:underline mt-1 inline-block" style={{ color: '#1E3A5F' }}>
            Learn More →
          </a>

          {product.variants.length > 0 && (
            <div className="mt-2 md:mt-3">
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariantId}
                onSelect={(variantId) => onSelectVariant(stepId, product.id, variantId)}
              />
            </div>
          )}

          <div className="mt-2 md:mt-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs md:text-sm text-gray-400 line-through mr-2">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-base md:text-lg font-bold" style={{ color: '#1E3A5F' }}>
                ${product.price.toFixed(2)}
              </span>
            </div>

            <QuantityStepper
              quantity={currentQuantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;