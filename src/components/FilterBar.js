import React from "react";

function FilterBar({ categories, years, onFilter, darkMode = false }) {
    const handleFilter = (e) => {
        const category = e.target.form[0].value; 
        const year = e.target.form[1].value; 
        onFilter(category, year); 
        e.preventDefault(); 
    };

    const selectStyle = `p-1.5 border rounded-md transition-colors duration-300 mr-2.5 ${
      darkMode
        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500'
        : 'bg-white border-gray-300 text-gray-800'
    }`;

    return (
        <form onSubmit={handleFilter} className="text-center mb-5">
            <select 
              onChange={handleFilter} 
              className={selectStyle}
            >
                <option value="">Semua Genre</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select 
              onChange={handleFilter} 
              className={selectStyle}
            >
                <option value="">Semua Tahun</option>
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
}

export default FilterBar;