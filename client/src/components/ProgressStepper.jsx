import React from 'react';

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Upload' },
    { number: 2, label: 'Style' },
    { number: 3, label: 'Result' },
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                currentStep >= step.number
                  ? 'bg-indigo-600'
                  : 'bg-gray-300'
              }`}
            >
              {currentStep > step.number ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">{step.label}</span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-2 ${
                currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              style={{ marginBottom: '24px' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressStepper;
