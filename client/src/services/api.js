import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const generateHeadshot = async (fileId, style) => {
  const response = await axios.post(`${API_BASE_URL}/generate`, {
    fileId,
    style,
  });

  return response.data;
};

export const getImageUrl = (path) => {
  return `http://localhost:3001${path}`;
};
