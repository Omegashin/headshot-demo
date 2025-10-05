import React, { useState } from 'react';
import ProgressStepper from '../components/ProgressStepper';

const Upload = ({ onNext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    setError('');

    // Validate file type
    if (!file.type.match('image/(jpeg|jpg|png)')) {
      setError('Please upload a JPEG or PNG image');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleNext = () => {
    if (selectedFile) {
      onNext({ file: selectedFile, preview });
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
        <ProgressStepper currentStep={1} />

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Photo</h2>

          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
            }`}
          >
            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Choose a different photo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileInput}
                  />
                </div>
                <p className="text-sm text-gray-500">JPEG or PNG (max 10MB)</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!selectedFile}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                selectedFile
                  ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next: Choose Style
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
