import React, { useState } from 'react';
import ProgressStepper from '../components/ProgressStepper';

const Result = ({ originalImage, generatedImage, onStartOver }) => {
  const [showComparison, setShowComparison] = useState(true);

  const handleDownload = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'professional-headshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 mb-3">HeadshotPro AI</h1>
          <p className="text-gray-600 text-lg">Transform any photo into a professional headshot in seconds</p>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={3} />

        {/* Result Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Your Professional Headshot
          </h2>
          <p className="text-gray-600 text-center mb-6">Here's your transformed image</p>

          {/* Hide/Show Comparison Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </button>
          </div>

          {/* Image Comparison */}
          {showComparison ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Before Image */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-4 py-2 rounded-full bg-gray-700 text-white text-sm font-semibold shadow-md">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg border-4 border-gray-200">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* After Image */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-md">
                    After
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg border-4 border-indigo-200">
                  <img
                    src={generatedImage}
                    alt="Generated headshot"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-lg shadow-lg border-4 border-indigo-200">
                <img
                  src={generatedImage}
                  alt="Generated headshot"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg transition-colors"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Headshot
            </button>
          </div>

          {/* Start Over Button */}
          <div className="flex justify-center">
            <button
              onClick={onStartOver}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Create Another Headshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
