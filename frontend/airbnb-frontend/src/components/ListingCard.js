import React from 'react';

export default function ListingCard({ listing, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer p-4 mb-4">
      <img src={listing.image_urls?.[0]} alt={listing.title} className="h-48 w-full object-cover rounded mb-2" />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{listing.title}</h2>
        <span className="text-indigo-600 font-bold">
          {listing.currency} {listing.price_per_night}
        </span>
      </div>
      <div className="text-gray-500">{listing.location}</div>
      <div className="text-yellow-500">⭐ {listing.ratings} ({listing.num_reviews} reviews)</div>
    </div>
  );
}