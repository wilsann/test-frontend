import React from "react";

function SearchBar({ onSearch, darkMode = false }) {
  const handleChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className="mb-5 text-center">
      <input
        type="text"
        placeholder="Cari film ..."
        onChange={handleChange}
        className={`w-4/5 p-2.5 text-base border rounded-md transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
        }`}
      />
    </div>
  );
}

export default SearchBar;