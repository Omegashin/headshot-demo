import { useState } from 'react';
import Upload from './pages/Upload';
import StyleSelection from './pages/StyleSelection';
import Loading from './pages/Loading';
import Result from './pages/Result';
import { uploadImage, generateHeadshot, getImageUrl } from './services/api';

function App() {
  const [step, setStep] = useState(1);
  const [uploadData, setUploadData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleUploadNext = (data) => {
    setUploadData(data);
    setStep(2);
  };

  const handleStyleNext = async (style) => {
    setSelectedStyle(style);
    setStep(3); // Loading state

    try {
      // Upload the image first
      const uploadResponse = await uploadImage(uploadData.file);
      const fileId = uploadResponse.fileId;

      // Generate the headshot
      const generateResponse = await generateHeadshot(fileId, style);
      const generatedImageUrl = getImageUrl(generateResponse.generatedPath);

      setGeneratedImage(generatedImageUrl);
      setStep(4);
    } catch (error) {
      console.error('Error generating headshot:', error);

      // Extract error message from response
      let errorMessage = 'Failed to generate headshot. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
        if (error.response.data.details) {
          errorMessage += '\n\n' + error.response.data.details;
        }
      }

      alert(errorMessage);
      setStep(2); // Go back to style selection
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleStartOver = () => {
    setStep(1);
    setUploadData(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
  };

  return (
    <>
      {step === 1 && <Upload onNext={handleUploadNext} />}
      {step === 2 && (
        <StyleSelection
          uploadedImage={uploadData.preview}
          onNext={handleStyleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && <Loading />}
      {step === 4 && (
        <Result
          originalImage={uploadData.preview}
          generatedImage={generatedImage}
          onStartOver={handleStartOver}
        />
      )}
    </>
  );
}

export default App;
