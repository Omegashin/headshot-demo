import React from 'react';
import ProgressStepper from '../components/ProgressStepper';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 mb-3">HeadshotPro AI</h1>
          <p className="text-gray-600 text-lg">Transform any photo into a professional headshot in seconds</p>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={3} />

        {/* Loading Content */}
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="text-center">
            {/* Spinner */}
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Generating Your Professional Headshot
            </h2>
            <p className="text-gray-600 mb-6">
              Our AI is transforming your photo. This may take a few moments...
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
