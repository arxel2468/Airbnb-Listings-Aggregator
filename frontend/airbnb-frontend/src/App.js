import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import ListingsGrid from './components/ListingsGrid';
import ListingDetails from './components/ListingDetails';
import { getListings, getListing } from './services/api';

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getListings(filters);
      // Ensure data is an array
      setListings(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setListings([]); // Reset listings on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchListings(filters);
  };

  const handleListingClick = (listing) => {
    navigate(`/listing/${listing.id}`);
  };

  if (loading && !listings.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-auto text-rose-500" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '32px', width: '32px', fill: 'currentcolor' }}>
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206c0 2.329 1.607 3.9 3.543 3.9 1.512 0 3.195-1.048 4.776-2.58l.445-.465 1.049-1.1.104.104c1.79 1.751 3.66 2.835 5.286 2.96l.15.004c1.935 0 3.542-1.571 3.542-3.9v-.21c-.015-.905-.147-1.577-.592-2.686l-.257-.635c-.994-2.298-5.088-10.958-7.067-14.789-1.053-1.909-1.889-2.315-3.228-2.315z"></path>
            </svg>
            <h1 className="ml-3 text-2xl font-bold text-rose-500">airbnb</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
              Airbnb your home
            </button>
            <button className="text-gray-900 hover:bg-gray-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 0 1 1.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 0 1 9 7.5V8a2 2 0 0 0 4 0 2 2 0 0 1 1.523-1.943A5.977 5.977 0 0 1 10 2c-2.493 0-4.667 1.53-5.668 3.733zm1.946 5.34C7.58 14.752 8.895 15.5 10.5 15.5c-2.2 0-4.083-1.17-5.168-2.918A5.986 5.986 0 0 1 10 16a5.986 5.986 0 0 1-3.722-1.292zM10 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex items-center border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <div className="h-8 w-8 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />
        
        {error && !listings.length ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{error}</p>
            <button
              onClick={() => fetchListings()}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <ListingsGrid
            listings={listings}
            onListingClick={handleListingClick}
          />
        )}
      </main>
    </div>
  );
}

function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const data = await getListing(id);
      setListing(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="text-rose-600 hover:text-rose-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Listings
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {listing && <ListingDetails listing={listing} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Navigate to="/" replace />} />
        <Route path="/listing/:id" element={<ListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;