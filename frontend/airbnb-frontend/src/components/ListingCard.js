import React from 'react';

export default function ListingCard({ listing, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative mt-6 flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={listing.image_urls?.[0] || "https://placehold.co/400x300?text=No+Photo"}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased truncate">
            {listing.title}
          </h5>
          <span className="text-indigo-600 font-bold text-lg">
            {listing.currency} {listing.price_per_night}
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-yellow-500 font-medium">{listing.ratings || '-'}</span>
          <span className="ml-1 text-gray-500">({listing.num_reviews || 0} reviews)</span>
        </div>
        <div className="text-gray-600 mb-4">{listing.location}</div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{listing.property_type}</span>
          <button
            className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-indigo-500 transition-all hover:bg-indigo-500/10 active:bg-indigo-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}