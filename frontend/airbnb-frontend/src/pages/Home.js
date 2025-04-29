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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {listings.length ? listings.map(listing => (
    <ListingCard
      key={listing.id}
      listing={listing}
      onClick={() => navigate(`/listing/${listing.id}`)}
    />
  )) : (
    <div className="col-span-full text-center text-gray-400 mt-12">No listings found.</div>
  )}
</div>
  );
}