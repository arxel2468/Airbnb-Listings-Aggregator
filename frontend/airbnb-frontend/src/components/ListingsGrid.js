import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingsGrid({ listings, onListingClick }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
        <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  const getFirstImageUrl = (listing) => {
    if (listing.image_urls && Array.isArray(listing.image_urls) && listing.image_urls.length > 0) {
      return listing.image_urls[0];
    }
    return 'https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            onClick={() => onListingClick(listing)}
            className="group cursor-pointer"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200">
              <img
                src={getFirstImageUrl(listing)}
                alt={listing.title}
                className="h-64 w-full object-cover object-center group-hover:opacity-75"
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
                    {listing.ratings || 'New'}
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
          </div>
        ))}
      </div>
    </div>
  );
} 