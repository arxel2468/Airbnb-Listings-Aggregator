import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Listing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listings/${id}/`)
      .then(res => setListing(res.data));
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <img
          src={listing.image_urls?.[0] || "https://placehold.co/600x400?text=No+Photo"}
          alt={listing.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <Link to="/" className="text-indigo-600 text-sm mb-4 block">&larr; Back to Listings</Link>
          <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            <span>{listing.location}</span>
            <span>|</span>
            <span>{listing.property_type}</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-yellow-500 font-bold">⭐ {listing.ratings}</span>
            <span className="text-gray-400">({listing.num_reviews} reviews)</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Price:</span> {listing.currency} {listing.price_per_night} per night
          </div>
          <div className="mb-4">{listing.description}</div>
          <div className="mb-2">
            <span className="font-semibold">Amenities:</span> {listing.amenities?.join(', ') || 'N/A'}
          </div>
          <div className="flex items-center mt-4">
            <span className="w-10 h-10 inline-block rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-3">
              {listing.host_info?.name ? listing.host_info.name.charAt(0) : 'H'}
            </span>
            <span className="text-sm text-gray-500">
              Host: {listing.host_info?.name || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}