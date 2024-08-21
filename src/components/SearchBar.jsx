import React from 'react';
import Loader from './LoadingSpinner'; 

function SearchBar({ city, handleChange, handleClick, loading }) {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
      {/* Input Field */}
      <input
        className="searchBar p-3 w-full rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg placeholder-gray-500 shadow-md transition-all"
        placeholder="Enter City Name"
        value={city}
        onChange={handleChange}
      />
      
      {/* Button */}
      <button
        className={`p-3 w-full rounded-full text-lg font-semibold text-white shadow-md 
          ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
          transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-95 disabled:cursor-not-allowed`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? <Loader /> : 'Get Weather'}
      </button>
    </div>
  );
}

export default SearchBar;
