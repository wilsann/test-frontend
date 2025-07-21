import React from "react";

function ItemCard({ item, darkMode = false }) { 
  const getImageUrl = (imagePath) => { 
    if (!imagePath) return null; 
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:8080/uploads/${imagePath}`;
  };

  const imageUrl = getImageUrl(item.image);

  return (
    <div className={`border rounded-md p-4 m-2 shadow-md w-64 min-h-[450px] flex flex-col transition-colors duration-300 ${
      darkMode 
        ? 'border-gray-600 bg-gray-800 text-gray-100' 
        : 'border-gray-300 bg-white text-gray-800'
    }`}>
      <div className={`w-full h-72 flex items-center justify-center mb-2.5 overflow-hidden relative ${
        darkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`text-base text-center ${imageUrl ? 'hidden' : 'flex'} ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span>No Image</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className={`text-sm flex-grow ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {item.description}
      </p>
      <p className="text-sm">
        <strong className={darkMode ? 'text-gray-200' : ''}>Genre:</strong> {item.genre}
      </p>
      <p className="text-sm">
        <strong className={darkMode ? 'text-gray-200' : ''}>Tahun:</strong> {item.year}
      </p>
      <p className="text-sm">
        <strong className={darkMode ? 'text-gray-200' : ''}>Sutradara:</strong> {item.director}
      </p>
      <small className={`text-xs mt-auto ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {new Date(item.created_at).toLocaleDateString()}
      </small>
    </div>
  );
}

export default ItemCard;