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
    <div className="max-w-3xl mx-auto my-8">
      <Link to="/" className="text-indigo-600 mb-4 inline-block">&larr; Back to Listings</Link>
      <img src={listing.image_urls?.[0]} alt={listing.title} className="w-full h-72 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
      <div className="text-gray-500 mb-2">{listing.location} | {listing.property_type}</div>
      <div className="mb-2">Price: <span className="font-semibold">{listing.currency} {listing.price_per_night}</span> per night</div>
      <div className="mb-2">⭐ {listing.ratings} ({listing.num_reviews} reviews)</div>
      <div className="mb-2">{listing.description}</div>
      <div className="mb-2">
        <span className="font-semibold">Amenities:</span> {listing.amenities?.join(', ')}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Host:</span> {listing.host_info?.name}
      </div>
    </div>
  );
}