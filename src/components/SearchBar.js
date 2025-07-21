import React from "react";

function SearchBar({ onSearch }) { // [cite: 21]
  const handleChange = (e) => { // [cite: 21]
    onSearch(e.target.value); 
  };

  return (
    <div className="mb-5 text-center"> {/* [cite: 22, 23] Refactored container style */}
      <input
        type="text"
        placeholder="Cari item berdasarkan nama..."
        onChange={handleChange}
        className="w-4/5 p-2.5 text-base border border-gray-300 rounded-md" // [cite: 22, 23] Refactored input style
      />
    </div>
  );
}

export default SearchBar;