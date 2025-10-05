# Professional Headshot AI App - Specification

## Overview

A web application that transforms user-uploaded photos into professional headshots using AI. Users can select from three distinct styles and compare the generated headshot side-by-side with their original photo.

## Requirements

### Functional Requirements

- Upload photo (JPEG/PNG, max 10MB)
- Select from three headshot styles:
  - **Corporate Classic**: Traditional business attire, neutral background
  - **Creative Professional**: Modern, approachable style with subtle artistic elements
  - **Executive Portrait**: Premium, high-impact leadership presence
- Generate professional headshot using AI
- Download generated headshot

### Non-Functional Requirements

- Responsive design (mobile and desktop)
- Image processing feedback (loading states)
- Error handling for failed uploads or API errors
- Secure file handling

## Tech Stack

### Frontend

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS/Tailwind CSS (v3 instead of v4)** - Styling

### Backend

- **Express.js** - Node.js web framework
- **Multer** - File upload handling
- **Google Gemini API** - Imagen 3 (nano banana) for image-to-image generation (https://ai.googl  
  e.dev/gemini-api/docs/image-generation)
- **dotenv** - Environment variable management

### Additional Tools

- **Node.js** - Runtime environment
- **npm** - Package manager

## Milestones

### Milestone 1: UI Setup

**Goal**: Create a fully functional frontend interface with all core UI components

**Tasks**:

- Initialize React project with Vite
- Set up Express backend with basic server structure
- Create photo upload component with file validation
- Build style selection interface (3 style cards/buttons)
- Add download button for generated images
- Create loading states and error notifications
- Set up frontend-backend communication (API endpoints structure)
- Style application with responsive design using Tailwind CSS v3

**Deliverables**:

- Working upload and preview system
- Style selection UI
- Comparison view layout
- Mock/placeholder generated images for testing UI flow

### Milestone 2: AI Integration

**Goal**: Integrate Google's Imagen 3 (nano banana) API for professional headshot generation

**Tasks**:

- Set up Google Cloud project and enable Gemini API
- Configure API authentication (API keys/credentials)
- Implement backend endpoint for image processing
- Integrate Imagen 3 image-to-image API: https://ai.google.dev/gemini-api/docs/image-generation
- Create style-specific prompts for each headshot style:
  - Corporate Classic prompt
  - Creative Professional prompt
  - Executive Portrait prompt
- Handle image conversion and format optimization
- Implement error handling for API failures
- Add rate limiting and request validation
- Test generation quality and adjust prompts
- Connect frontend to live backend API

**Deliverables**:

- Fully functional AI headshot generation
- All three styles producing quality outputs
- End-to-end working application
- Error handling for API limits/failures

## API Endpoint Design

### POST /api/upload

- Accept image file upload
- Return upload confirmation and file ID

### POST /api/generate

- Input: file ID, selected style
- Process: Call Gemini API with style-specific prompt
- Output: Generated headshot image URL/data

### GET /api/download/:imageId

- Serve generated headshot for download

## Future Enhancements

- User accounts and image history
- Batch processing multiple photos
- Additional style options
- Fine-tuning controls (background color, lighting, etc.)
- Social media optimization (LinkedIn, Twitter profile sizes)
