import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });
  
  const [activeTab, setActiveTab] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
    setActiveTab(null);
  };

  // Filter categories similar to Airbnb
  const categories = [
    { id: 'amazing-views', name: 'Amazing views', icon: '🏞️' },
    { id: 'icons', name: 'Icons', icon: '🗿' },
    { id: 'amazing-pools', name: 'Amazing pools', icon: '🏊' },
    { id: 'farms', name: 'Farms', icon: '🚜' },
    { id: 'golfing', name: 'Golfing', icon: '⛳' },
    { id: 'historical-homes', name: 'Historical homes', icon: '🏛️' },
    { id: 'omg', name: 'OMG!', icon: '😲' },
    { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
    { id: 'lakefront', name: 'Lakefront', icon: '🏞️' },
  ];

  return (
    <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
      {/* Main Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <div className="relative flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md w-auto">
            {/* Where */}
            <div 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'where' ? 'bg-gray-100 rounded-full' : ''}`}
              onClick={() => setActiveTab(activeTab === 'where' ? null : 'where')}
            >
              <div className="text-sm font-semibold">Where</div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Search destinations"
                className="bg-transparent focus:outline-none w-32 text-sm"
              />
            </div>
            
            <span className="border-r border-gray-300 h-8"></span>
            
            {/* Check in */}
            <div 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'checkIn' ? 'bg-gray-100 rounded-full' : ''}`}
              onClick={() => setActiveTab(activeTab === 'checkIn' ? null : 'checkIn')}
            >
              <div className="text-sm font-semibold">Check in</div>
              <input
                type="date"
                name="checkIn"
                value={filters.checkIn}
                onChange={handleInputChange}
                className="bg-transparent focus:outline-none text-sm text-gray-500"
              />
            </div>
            
            <span className="border-r border-gray-300 h-8"></span>
            
            {/* Check out */}
            <div 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'checkOut' ? 'bg-gray-100 rounded-full' : ''}`}
              onClick={() => setActiveTab(activeTab === 'checkOut' ? null : 'checkOut')}
            >
              <div className="text-sm font-semibold">Check out</div>
              <input
                type="date"
                name="checkOut"
                value={filters.checkOut}
                onChange={handleInputChange}
                className="bg-transparent focus:outline-none text-sm text-gray-500"
              />
            </div>
            
            <span className="border-r border-gray-300 h-8"></span>
            
            {/* Who */}
            <div 
              className={`pl-6 pr-2 py-3 cursor-pointer flex items-center ${activeTab === 'who' ? 'bg-gray-100 rounded-full' : ''}`}
              onClick={() => setActiveTab(activeTab === 'who' ? null : 'who')}
            >
              <div>
                <div className="text-sm font-semibold">Who</div>
                <div className="text-sm text-gray-500">Add guests</div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="ml-4 flex items-center bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced filters dropdown */}
      {activeTab === 'who' && (
        <div className="absolute right-1/2 transform translate-x-1/2 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 w-96 z-20">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Adults</div>
                <div className="text-sm text-gray-500">Ages 13 or above</div>
              </div>
              <div className="flex items-center">
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                <span className="px-4">{filters.guests}</span>
                <button 
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  onClick={() => handleInputChange({ target: { name: 'guests', value: filters.guests + 1 }})}
                >+</button>
              </div>
            </div>
            
            <hr />
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Price range</div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="w-24 p-2 border border-gray-300 rounded"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="w-24 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Minimum Rating</div>
              </div>
              <input
                type="number"
                name="minRating"
                value={filters.minRating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                placeholder="0-5"
                className="w-24 p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <button 
                className="text-gray-800 underline font-semibold"
                onClick={() => {
                  setFilters({
                    location: '',
                    checkIn: '',
                    checkOut: '',
                    guests: 1,
                    minPrice: '',
                    maxPrice: '',
                    minRating: ''
                  });
                }}
              >
                Clear all
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex space-x-8 pb-4">
          {categories.map(category => (
            <button 
              key={category.id}
              className="flex flex-col items-center space-y-2 min-w-fit opacity-70 hover:opacity-100 hover:border-b-2 hover:border-gray-800 pb-2"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex justify-between items-center">
          <button className="border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium flex items-center shadow-sm hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </button>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Prices include all fees</span>
            <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
              <input type="checkbox" id="toggle" className="sr-only" />
              <div className="block w-12 h-6 rounded-full bg-rose-500"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}