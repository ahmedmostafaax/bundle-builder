import React from 'react';
import Step from './Step';

function Builder({ 
  steps, 
  currentStep, 
  selectedState, 
  onSelectVariant, 
  onUpdateQuantity, 
  onSetCurrentStep,
  getSelectedCount 
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8" style={{ color: '#1E3A5F' }}>
        Let's get started!
      </h1>
      <div className="space-y-3 md:space-y-4">
        {steps.map((step) => (
          <Step
            key={step.id}
            step={step}
            isOpen={currentStep === step.id}
            selectedState={selectedState[step.id]}
            onToggle={() => onSetCurrentStep(step.id)}
            onSetCurrentStep={onSetCurrentStep}
            onSelectVariant={onSelectVariant}
            onUpdateQuantity={onUpdateQuantity}
            getSelectedCount={getSelectedCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Builder;