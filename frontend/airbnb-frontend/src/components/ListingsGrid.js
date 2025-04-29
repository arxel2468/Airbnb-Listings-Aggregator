import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingsGrid({ listings }) {
  if (!listings || !Array.isArray(listings)) {
    return <div className="text-center text-gray-500">No listings found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            to={`/listing/${listing.id}`}
            className="group"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200">
              <img
                src={listing.image_url || 'https://placehold.co/600x400'}
                alt={listing.title}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-900">
                  {listing.title}
                </h3>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">
                    {listing.rating || 'New'}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {listing.location}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                ${listing.price_per_night} per night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 