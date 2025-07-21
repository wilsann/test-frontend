import React from "react";

function ItemCard({ item }) { 
  const getImageUrl = (imagePath) => { 
  if (!imagePath) return null; 
  if (imagePath.startsWith('http')) { // [cite: 13]
    return imagePath;
  }
  return `http://localhost:8080/uploads/${imagePath}`;
};

const imageUrl = getImageUrl(item.image);

  return (
    <div className="border border-gray-300 rounded-md p-4 m-2 shadow-md w-64 min-h-[450px] flex flex-col"> {/* [cite: 18] Refactored card style */}
      <div className="w-full h-72 bg-gray-100 flex items-center justify-center mb-2.5 overflow-hidden relative"> {/* [cite: 18, 19] Refactored imageContainer style */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-md" // [cite: 19] Refactored image style
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`text-gray-500 text-base text-center ${imageUrl ? 'hidden' : 'flex'}`}> {/* [cite: 16, 17, 19] Refactored noImage style */}
          <span>No Image</span> {/* [cite: 17] */}
        </div>
      </div>
      <h3 className="text-lg font-semibold">{item.name}</h3> {/* Refactored heading style */}
      <p className="text-sm text-gray-700 flex-grow">{item.description}</p> {/* Refactored paragraph style */}
      <p className="text-sm"><strong>Genre:</strong> {item.genre}</p> {/* Refactored paragraph style */}
      <p className="text-sm"><strong>Tahun:</strong> {item.year}</p> {/* Refactored paragraph style */}
      <p className="text-sm"><strong>Sutradara:</strong> {item.director}</p> {/* Refactored paragraph style */}
      <small className="text-xs text-gray-500 mt-auto">{new Date(item.created_at).toLocaleDateString()}</small> {/* Refactored small text style */}
    </div>
  );
}

export default ItemCard;