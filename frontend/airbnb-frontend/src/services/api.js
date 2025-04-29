import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getListings = async (filters = {}) => {
  try {
    const response = await api.get('/api/listings/', { params: filters });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch listings');
    }
    throw new Error('Network error. Please try again later.');
  }
};

export const getListing = async (id) => {
  try {
    const response = await api.get(`/api/listings/${id}/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Listing not found');
    }
    throw new Error('Failed to fetch listing details');
  }
};

export const addListing = async (listingData) => {
  try {
    const response = await api.post('/api/add_listing/', listingData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(Object.values(error.response.data)[0] || 'Failed to add listing');
    }
    throw new Error('Failed to add listing');
  }
}; 