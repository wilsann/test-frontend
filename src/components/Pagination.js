import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1); 

    return (
        <div className="text-center mt-5"> {/* [cite: 2] Refactored container style */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`mx-1 px-2.5 py-1.5 cursor-pointer border-none rounded-md ${
                        currentPage === page ? "bg-green-500 text-white" : "bg-gray-300"
                    }`} // [cite: 3, 4, 5] Refactored button and active styles
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;