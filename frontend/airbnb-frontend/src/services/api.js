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
    // Map frontend filter names to backend parameter names
    const params = {
      location: filters.location,
      search: filters.search,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      min_rating: filters.minRating,
      property_type: filters.propertyType,
      check_in_date: filters.checkIn,
      check_out_date: filters.checkOut,
      num_guests: filters.guests
    };
    
    // Remove undefined/empty values
    const cleanParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    
    const response = await api.get('/api/listings/', { params: cleanParams });
    
    // Handle paginated response
    return response.data.results || response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch listings');
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