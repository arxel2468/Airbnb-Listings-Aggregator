import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchListings = (filters = {}) => {
    let params = [];
    if (filters.location) params.push(`location=${filters.location}`);
    if (filters.minPrice) params.push(`min_price=${filters.minPrice}`);
    if (filters.maxPrice) params.push(`max_price=${filters.maxPrice}`);
    if (filters.ratings) params.push(`ratings=${filters.ratings}`);
    const query = params.length ? '?' + params.join('&') : '';
    axios.get(`http://localhost:8000/api/listings/${query}`)
      .then(res => setListings(res.data));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold my-6 text-center">Airbnb Listings</h1>
      <SearchBar onSearch={fetchListings} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onClick={() => navigate(`/listing/${listing.id}`)}
          />
        ))}
      </div>
    </div>
  );
}