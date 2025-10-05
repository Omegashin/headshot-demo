import React, { useState } from 'react';
import ProgressStepper from '../components/ProgressStepper';

const StyleSelection = ({ uploadedImage, onNext, onBack }) => {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const styles = [
    {
      id: 'corporate',
      name: 'Corporate Classic',
      description: 'Traditional business attire, neutral background',
      icon: '💼',
    },
    {
      id: 'creative',
      name: 'Creative Professional',
      description: 'Modern, approachable style with subtle artistic elements',
      icon: '🎨',
    },
    {
      id: 'executive',
      name: 'Executive Portrait',
      description: 'Premium, high-impact leadership presence',
      icon: '👔',
    },
  ];

  const handleNext = () => {
    if (selectedStyle) {
      onNext(selectedStyle);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 mb-3">HeadshotPro AI</h1>
          <p className="text-gray-600 text-lg">Transform any photo into a professional headshot in seconds</p>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={2} />

        {/* Style Selection */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Style</h2>

          {/* Uploaded Image Preview */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Your photo"
                className="h-32 w-32 rounded-full object-cover shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`cursor-pointer rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
                  selectedStyle === style.id
                    ? 'border-indigo-600 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{style.name}</h3>
                  <p className="text-sm text-gray-600">{style.description}</p>
                  {selectedStyle === style.id && (
                    <div className="mt-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="px-8 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedStyle}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                selectedStyle
                  ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Generate Headshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelection;
