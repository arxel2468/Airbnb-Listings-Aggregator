import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratings, setRatings] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, guests, minPrice, maxPrice, ratings });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        className="p-2 border rounded"
        placeholder="Guests"
        min={1}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
      <input
        type="number"
        className="p-2 border rounded"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        className="p-2 border rounded"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <input
        type="number"
        className="p-2 border rounded"
        placeholder="Min Ratings"
        value={ratings}
        onChange={(e) => setRatings(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        type="submit"
      >Search</button>
    </form>
  );
}